const express = require("express");

const cohortRouter = require('./data/cohort-router.js')
const studentRouter = require('./data/student-router.js')

const server = express();

server.use(express.json());

server.use('/api/cohorts', cohortRouter);

server.use('/students', studentRouter);
 
module.exports = server;