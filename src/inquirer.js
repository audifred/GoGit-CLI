const {prompt} = require('inquirer');
const path = require('path');

const getCurrentDirectoryBase = () => path.basename(path.resolve(process.cwd()));

const askGithubCredentials = () => {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your github username or e-mail address:',
      validate: (value) => value.length > 0 ? true : 'pleaase enter your username or e-mail address'
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: (value) => value.length > 0 ? true : 'Enter your password:'
    }
  ];
  return prompt(questions);
};


const askRepoDetails = () => {
  const argv = require('minimist')(process.argv.slice(2));

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the repository',
      default: argv._[0] || getCurrentDirectoryBase(),
      validate: value =>
        value.length ? true : 'Enter a name for the repository'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description for repo (optional)',
      default: argv._[1] || null
    },
    {
      type: 'list',
      name: 'visibility',
      message: 'Private or Public?',
      choices: ['public', 'private'],
      default: 'public'
    }
  ];
  return prompt(questions);
};

const get2FaCode = () => {
  return prompt({
    name: 'twoFaCode',
    type: 'input',
    message: 'Enter GitHub 2Fa passcode',
    validate: value => value.length > 0 ? true : 'Enter GitHub 2Fa passcode'
  })

}

const askIgnoreFiles = filelist => {
  const questions = [
    {
      type: 'checkbox',
      name: 'ignore',
      message: 'Select the files and folders you wish to ignore',
      choices: filelist,
      default: ['node_modules']
    }
  ];
  return prompt(questions);
};

module.exports = {
  askGithubCredentials,
  askRepoDetails,
  askIgnoreFiles,
  get2FaCode
};
