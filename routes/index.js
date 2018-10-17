'use strict';

const express = require('express');
const router = express.Router();
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
const todos = require('../models/todos');

router.get('/users', (req, res, next) => {
  res.json(todos.listPeople());
});

router.get('/users/:name/tasks', (req, res) => {
  const name = req.params.name;
  const taskList = todos.list(name);
  const queryParams = req.query;
  if (!todos.listPeople().includes(name)) {
    return res.status(404).send('Not Found!');
  }
  if (!queryParams.status) {
    return res.json(taskList);
  } else if (queryParams.status === 'complete') {
    const results = taskList.filter(task => {
      return task.complete === true;
    });
    return res.json(results);
  } else if (queryParams.status === 'active') {
    const results = taskList.filter(task => {
      return task.complete === false;
    });
    return res.json(results);
  }
});

router.put('/users/:name/tasks/:index', (req, res) => {
  const ind = req.params.index;
  const name = req.params.name;
  const completedTask = todos.complete(name, ind);
  res.status(200).send(completedTask);
});

router.delete('/users/:name/tasks/:index', (req, res) => {
  const ind = req.params.index;
  const name = req.params.name;
  res.status(204).send(todos.remove(name, ind));
});

router.post('/users/:name/tasks', (req, res) => {
  const result = todos.add(req.params.name, req.body);
  if (req.body.content === '') {
    res.status(400).send('Bad Request');
  } else {
    res.status(201).send(result);
  }
});
