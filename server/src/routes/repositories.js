const express = require('express');
const router = express.Router();
const githubService = require('../services/github-service');
const localDbService = require('../services/local-db-service');

const FIND_REPOS_ERROR = 'Can not get repositories list. Try again later.';
const CREATION_REPO_ERROR = 'Such a repository already exists';

router.post('/', async function (req, res) {
  try {
    const {user, repository, userId} = req.body;
    const repoId =  await localDbService.findRepo(user, repository);
    if (repoId) {
      const dependency =  await localDbService.findDependency(userId, repoId);
      if (dependency) {
        res.status(409).send(CREATION_REPO_ERROR);
      } else {
        const newDependency = { id_user: userId, id_repo: repoId };
        await localDbService.createDependency(newDependency);
        getRepoList(userId, res);
      }
    } else {
      const githubRepo = await githubService.getRepo(user, repository);
      await localDbService.saveRepo(githubRepo);
      const repoId =  await localDbService.findRepo(user, repository);
      const newDependency = { id_user: userId, id_repo: repoId };
      await localDbService.createDependency(newDependency);
      getRepoList(userId, res);
    }
  } catch (error) {
    if (error.isAxiosError && error.response.statusText === 'Not Found') {
      res.status(404).send('Such repository not exist. You provide wrong data');
      return;
    }
    res.status(503).send('Something went wrong. Try again later.');
    console.log(error);
  }
});

router.get('/', function (req, res) {
  const {userId} = req.query;
  getRepoList(userId, res);
});

router.post('/refresh', async function (req, res) {
  try {
    const {user, repository, userId} = req.body;
    const githubRepo = await githubService.getRepo(user, repository);
    const repoId =  await localDbService.findRepo(user, repository);
    await localDbService.refreshRepo(githubRepo, repoId)
    getRepoList(userId, res);
  } catch (error) {
    res.status(503).send('Something went wrong. Try again later.');
    console.log(error);
  }
});

router.delete('/', async function (req, res) {
  try {
    const {user, repository, userId} = req.query;
    const repoId = await localDbService.findRepo(user, repository);
    await localDbService.deleteDependency(userId, repoId);
    //if no more dep - delete repo
    getRepoList(userId, res);
  } catch (error) {
    res.status(503).send('Something went wrong. Try again later.');
    console.log(error);
  }
});

async function getRepoList(userId, res) {
  try {
    const repoIdArray = await localDbService.findDependencies(userId);
    const repoHandlers =  await repoIdArray.map(async (repo) => {
      const repoData = await localDbService.findRepoData(repo.id_repo);
      return repoData[0];
    });
    const repos = await Promise.all(repoHandlers);
    res.send({repos});
  } catch (error) {
    res.status(503).send(FIND_REPOS_ERROR);
  }
}

module.exports = router;
