'use strict';

const path = require('path');
const util = require('util');
const packageJson = require('../package.json');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

const folderName = process.argv[2];
const ownPath = process.cwd();
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/Flaze24/ELOMax.git';

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('npx create-my-boilerplate my-app');
  process.exit(1);
}

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${folderName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
    console.log(`${repo} ${folderName}`)
    await exec(`git clone --depth 1 ${repo} ${folderName}`);

    process.chdir(appPath);

    console.log();

    await exec('npx rimraf ./.git');
    console.log();
    console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
    await exec('npm install');

    console.log(
      '\x1b[32m',
      'The installation is done, this is ready to use !',
      '\x1b[0m'
    );
    console.log();

    console.log('\x1b[34m', 'You can start by typing:');
    console.log(`    cd ${folderName}`);
    console.log('    npm start', '\x1b[0m');
    console.log();
    console.log('Check Readme.md for more informations');
    console.log();
  } catch (error) {
    console.log(error);
  }
}

setup();
