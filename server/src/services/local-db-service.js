const myQuery = require('../db');

const CREATE_REPO_SQL = `INSERT INTO user_repo SET ?`;
const FIND_REPO_SQL = `SELECT repo_id FROM user_repo WHERE owner = ? AND repo = ? ;`;
const REFRESH_REPO_SQL = `UPDATE user_repo SET ? WHERE repo_id = ?;`
const CREATE_DEPENDENCY_SQL = `INSERT INTO dependency SET ?`;
const FIND_DEPENDENCY_SQL = `SELECT id_repo FROM dependency WHERE id_user = ? AND id_repo = ?;`
const DELETE_DEPENDENCY_SQL = `DELETE FROM dependency WHERE id_user = ? AND id_repo = ?;`;
const FIND_DEPENDENCIES_SQL = `SELECT id_repo FROM dependency WHERE id_user = ?;`;
const FIND_REPO_DATA_SQL = `SELECT owner, repo, url, stars, forks, issues, created_at
FROM user_repo WHERE repo_id = ?;`;

function convertToDbRepo(githubRepo)  {
  const {owner, name: repo, html_url, stargazers_count, forks_count, open_issues_count, created_at } = githubRepo.data;
  return {owner: owner.login, repo, url: html_url, stars: stargazers_count, forks: forks_count, issues: open_issues_count, created_at};
}

localDbService = {
  saveRepo: function(githubRepo) {
    myQuery(CREATE_REPO_SQL, convertToDbRepo(githubRepo));
  },
  findRepo: async function(user, repository) {
    const existingRepos = await myQuery(FIND_REPO_SQL, [user, repository]);
    if (!existingRepos.length) {
      return 0;
    }
    const [{repo_id}] = existingRepos;
    return repo_id;
  },
  refreshRepo: function(githubRepo, repoId) {
    const repoData = convertToDbRepo(githubRepo);
    myQuery(REFRESH_REPO_SQL, [repoData, repoId]);
  },
  createDependency: function(dependency) {
    myQuery(CREATE_DEPENDENCY_SQL, dependency);
  },
  findDependency: async function(userId, repoId) {
    const existingRepos = await myQuery(FIND_DEPENDENCY_SQL, [userId, repoId]);
    if (!existingRepos.length) {
      return 0;
    }
    const [{id_repo}] = existingRepos;
    return id_repo;
  },
  deleteDependency: function(userId, repoId) {
    myQuery(DELETE_DEPENDENCY_SQL, [userId, repoId]);
  },
  findDependencies: async function(userId) {
    const existingRepos = await myQuery(FIND_DEPENDENCIES_SQL, userId);
    return existingRepos;
  },
  findRepoData: async function(repoId) {
    const repoData = await myQuery(FIND_REPO_DATA_SQL, repoId);
    return repoData;
  }
}

module.exports = localDbService;