// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'github'
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is your project name?',
        name: 'project'
    },
    {
        type: 'input',
        message: 'Please write a short description of your project:',
        name: 'description'
    },
    {
        type: 'list',
        message: 'What kind of license should your project have?',
        name: 'license',
        choices: ['MIT', 'GNU', 'None']
    },
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'install',
        default: 'npm i'
    },
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'test',
        default: 'npm test'
    },
    {
        type: 'input',
        message: 'What usage information do users need to know?',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'What do contributors need to know?',
        name: 'contributing',
    }
];

// TODO: Create a function to write README file
function writeToFile() {
    // generateMarkdown.sayHello()
    inquirer
        .prompt(questions)
        .then((response) => {
            const READMEContent =
`# ${response.project}
${renderLicenseBadge(response.license)}
## Description
${response.description}
## Table of Contents
* [Description](#description)
* [Table of Contents](#table-of-contents)
* [Installation](#installation)
* [Usage](#usage)
${renderLicenseLink(response.license)}
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
\`\`\`bash
${response.install}
\`\`\`
## Usage
${response.usage}
${renderLicenseSection(response.license)}
## Contributing
${response.contributing}
## Tests
\`\`\`bash
${response.test}
\`\`\`
## Questions
GitHub: **[${response.github}](https://github.com/${response.github})**

Email: **[${response.email}](mailto:${response.email})**`

        fs.writeFile('README.md', READMEContent, function (err) {
            if (err) throw err;
            console.log('README.md created.')
        });
        renderLicenseBadge(response.license);
        renderLicenseLink(response.license);
        renderLicenseSection(response.license);
        });

}

function renderLicenseBadge(license) {
    if (license !== 'None') {
        return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`;
    }
    return '';
}

function renderLicenseLink(license){
    if (license !== 'None') {
        return `* [License](#license)`;
    }
    return '';
}

function renderLicenseSection(license) {
    if (license === 'MIT') {
        return `## License\n[MIT License](https://opensource.org/licenses/MIT)`;
    } else if (license === 'GNU'){
        return `## License\n[GNU License](https://www.gnu.org/licenses/gpl-3.0.html)`;
    } else {
        return '';
    }
}

// TODO: Create a function to initialize app
function init() {
    writeToFile();
}

// Function call to initialize app
init();
