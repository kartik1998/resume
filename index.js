#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const data = require('./data.json');

// add response color
const response = chalk.bold.green;
const seperator = chalk.gray;

const resumeOptions = {
  type: 'list',
  name: 'resumeOptions',
  message: 'What do you want to know',
  choices: [...Object.keys(data), 'Exit'],
};

function showResume() {
  console.log('Hi! My name is Kartik and welcome to my resume!');
  handleResume();
}

function handleResume() {
  inquirer
    .prompt(resumeOptions)
    .then((answer) => {
      if (answer.resumeOptions == 'Exit') return;

      const options = data[`${answer.resumeOptions}`];
      if (options) {
        console.log(seperator(new inquirer.Separator()));
        options.forEach((info, i) => {
          if (typeof info === 'object') {
            Object.keys(info).forEach((key) => {
              console.log(response('   ' + chalk.blue(key) + chalk.blue(': ') + info[key]));
            });
            if (i !== options.length - 1) {
              console.log();
            }
          } else {
            console.log(response(' ' + info));
          }
        });
        console.log(seperator(new inquirer.Separator()));
      }

      inquirer
        .prompt({
          type: 'list',
          name: 'exitBack',
          message: 'Go back or Exit?',
          choices: ['Back', 'Exit'],
        })
        .then((choice) => {
          if (choice.exitBack == 'Back') {
            handleResume();
          } else {
            return;
          }
        });
    })
    .catch((err) => console.log('Ooops,', err));
}

showResume();
