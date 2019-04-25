const constant = require('../../constants/constant.js');
const util = require('../../core/util.js')

const Freemarker = require('freemarker');
const freemarkerFile = new Freemarker({ root: __dirname });
var glob = require('glob')
    , path = require('path');
const inquirer = require('inquirer');
const df = require('dateformat');
const fs = require('fs');
const {exec, spawn, spawnSync} = require("child_process");

module.exports = {
    addProgram: function (program) {

        let todayLogquestions = [
            {
                name: "author",
                type: "input",
                message: "Enter author name : ",
                default: "John Doe"
            }
        ];

        let docQuestions = [
            {
                name: "filename",
                type: "input",
                message: "Enter filename : ",
                default: "Filename"
            },
            {
                name: "author",
                type: "input",
                message: "Enter author name : ",
                default: "John Doe"
            },
            {
                name: "title",
                type: "input",
                message: "Enter document title : "
            },
            {
                name: "description",
                type: "input",
                message: "Enter document description : "
            }
        ];

        /**
         * Render and open file using system default application
         * 
         * @param {Map} data 
         * @param {String} filename 
         */
        function renderFreemarker(data, filename, ftlFilename) {
            freemarkerFile.renderFile(path.join(__dirname, ftlFilename), data, (err, result) => {
                if (err) {
                    throw new Error(err);
                }

                // add flag wx to prevent overriding existing file
                fs.writeFile(filename, result, { flag: 'wx' }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Created " + filename);
                    }
                    spawn(util.openFileCommand(), [filename], { stdio: 'inherit' });
                });

            });
        }

        program
            .command('doc:todaylog')
            .description('To create today documentation log')
            .action(() => {

                process.chdir(constant.LOG_OUTPUT_PATH);
                let currentDate = new Date();
                let filename = df(currentDate, "yyyymmdd") + ".txt";

                if (fs.existsSync(filename)) {
                    spawn(util.openFileCommand(), [filename], { stdio: 'inherit' });
                    return;
                }


                inquirer.prompt(todayLogquestions).then(function (answer) {

                    let data = {
                        author: answer.author,
                        date: df(currentDate, "dd mmmm yyyy")
                    };

                   renderFreemarker(data, filename,'log.ftl');

                });
            });

        program
            .command('doc:task')
            .description('To create task documentation')
            .action(() => {
                process.chdir(constant.LOG_OUTPUT_PATH);
                let currentDate = new Date();
                let filename = df(currentDate, "yyyymmdd") + ".txt";

                if (fs.existsSync(filename)) {
                    spawn(util.openFileCommand(), [filename], { stdio: 'inherit' });
                    return;
                }


                inquirer.prompt(docQuestions).then(function (answer) {

                    let filename = answer.filename + ".txt";
                    if (fs.existsSync(filename)) {
                        spawn(util.openFileCommand(), [filename], { stdio: 'inherit' });
                        return;
                    }

                    let data = {
                        title: answer.title,
                        author: answer.author,
                        date: df(currentDate, "dd mmmm yyyy"),
                        description: answer.description
                    };

                   renderFreemarker(data, filename, 'task.ftl');

                });

            });
    }
}