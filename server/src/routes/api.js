const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const myQuery = require('../db');

const REGISTRATION_SERVER_ERROR = 'Registration was not successfull. Try again later';
const REGISTRATION_EMAIL_ERROR = 'Such email already exists';
const REGISTRATION_SUCCESS = 'Registration was successful';
const FIND_USER_REG_SQL = `SELECT user_id FROM user_login WHERE login = ?;`;
const CREATE_USER_SQL = `INSERT INTO user_login SET ?;`;
const FIND_USER_AUTHZ_SQL = `SELECT user_id FROM user_login WHERE login = ? AND PASSWORD = ?;`;
const AUTHORIZATION_SERVER_ERROR = 'Authorization was not successfull. Try again later';
const AUTHORIZATION_DATA_ERROR = 'You provide wrong data';

router.use('/repositories', require('./repositories')); 

router.post('/registration', async function (req, res) {
  const {email, password} = req.body;
  const userData = {login: email, password: password};
  try {
    const findUser = await myQuery(FIND_USER_REG_SQL, email);
    if (findUser.length) {
      res.status(409).send(REGISTRATION_EMAIL_ERROR);
      return;
    }
    await myQuery(CREATE_USER_SQL, userData);
    res.send(REGISTRATION_SUCCESS);
  } catch (error) {
    res.status(503).send(REGISTRATION_SERVER_ERROR);
  }
});

router.post('/authorization', async function (req, res) {
  const {email, password} = req.body;
  try {
    let userExist = await myQuery(FIND_USER_AUTHZ_SQL, [email, password]);
    if (userExist.length) {
      res.send({responseForUser: 'Authorization was successful', user_id: userExist[0].user_id, uuid: uuidv4()});
    } else {
      res.status(409).send(AUTHORIZATION_DATA_ERROR);
    }
  } catch (error) {
    res.status(503).send(AUTHORIZATION_SERVER_ERROR);
  }
});


module.exports = router;
