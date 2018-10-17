'use strict';

let tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function() {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function() {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function(name, task) {
    // saves a task for a given person
    if (!tasks[name]) {
      tasks[name] = [];
    }
    if (!task.complete) {
      task.complete = false;
    }
    tasks[name].push(task);
    return task;
  },
  list: function(name) {
    if (tasks[name]) {
      return tasks[name];
    } else {
      return [];
    }
  },
  complete(name, task) {
    if (name[task]) {
      tasks[name][task].complete = true;
    }
  },
  remove(name, index) {
    tasks[name].splice(index, 1);
  },
};
