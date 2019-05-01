const express = require("express");

const cohortRouter = require("./cohort/cohort-router.js");
// const studentRouter = require('./data/student-router.js')

const server = express();

server.use(express.json());

server.use("/api/cohort", cohortRouter);

// server.use('/student', studentRouter);

module.exports = server;
