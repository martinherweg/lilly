/**
 * Prompt Question for the Project
 *
 * @package  generator-lilly
 * @author   Martin Herweg <info@martinherweg.de>
 */

const chalk = require('chalk');

// Importing message helper function
const message = require('../helpers/promptMessage');
const when = require('../helpers/when');

const generalPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: message({
      headline: 'Project Name',
      description: 'Please provide a Project Name (without-spaces)',
      defaultValue: 'Current Name',
    }),
    default: function() {
      return process
        .cwd()
        .split('/')
        .pop(-1)
        .toLowerCase()
        .replace(/\s/g, '');
    },
    validate: function(input) {
      // Do async stuff
      if (input.indexOf(' ') >= 0 || /[~`!#$%^&*+=[\]\\';,/{}|\\":<>?]/g.test(input)) {
        // Pass the return value in the done callback
        console.log(
          '\n' +
            chalk.styles.red.open +
            'No whitespaces or special-chars allowed!' +
            chalk.styles.red.close,
        );
        return false;
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: message({
      headline: 'Project Description',
      description: 'Please provide a description for your project.',
      defaultValue: false,
    }),
  },
  {
    type: 'input',
    name: 'projectVersion',
    message: message({
      headline: 'Project Version',
      description: 'Define Project Version',
    }),
    default: '0.0.1',
  },
  {
    type: 'input',
    name: 'projectProxy',
    message: message({
      headline: 'Project Local Domain',
      description: 'Define Project Local Domain, defaults to your project name',
    }),
    default: function(answers) {
      // If the
      if (
        answers.projectName.includes('.dev') ||
        answers.projectName.includes('.local') ||
        answers.projectName.includes('.test')
      ) {
        return answers.projectName;
      }
      return `${answers.projectName}.test`;
    },
  },
  {
    type: 'list',
    name: 'projectUsage',
    message: message({
      headline: 'Project Type',
      description: 'Choose your Project Type',
      defaultValue: false,
    }),
    choices: [
      {
        name: 'Craft',
        value: 'craft',
      },
      {
        name: 'Craft 3',
        value: 'craft3',
      },
      {
        name: 'Laravel',
        value: 'laravel',
      },
      {
        name: 'Vue Application',
        value: 'vueapp',
      },
    ],
  },
  {
    when: when({
      question: 'projectUsage',
      type: 'vueapp',
      condition: '!=',
    }),
    type: 'list',
    name: 'projectFramework',
    message: message({
      headline: 'JavaScript Framework',
      description: 'Choose your favorite JavaScript framework',
      defaultValue: false,
    }),
    choices: [
      {
        name: 'None',
        value: 'none',
      },
      {
        name: 'Vue.js',
        value: 'vue',
      },
      {
        name: 'React',
        value: 'react',
      },
    ],
  },
];

module.exports = generalPrompts;
