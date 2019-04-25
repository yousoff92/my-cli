#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const df = require('dateformat');
const inquirer = require('inquirer');
const { exec, spawn, spawnSync } = require("child_process");

var moment = require('moment');
var zlib = require("zlib");

var glob = require( 'glob' )
  , path = require( 'path' );

  const Freemarker = require('freemarker');
  const freemarkerFile = new Freemarker({ root: __dirname });  

// ----- Configuration -----

program
    .version('0.0.1')
    .description('My CLI Tool');

let workspaceDir = fs.realpathSync(__dirname);
let componentDir = workspaceDir + '/components/*'

glob.sync( componentDir ).forEach( function( file) {
    let baseName = path.basename(file);
    let jsFileName = file + "/"  + baseName + ".js";
    let component = require( path.resolve( jsFileName ) );
    component.addProgram(program);
}); 

// ----- Start Program -----

program
    .command('test')
    .description('To test.')
    .action(() => {
        console.log(fs.realpathSync(__dirname));
    });

    program
    .command('add-component <name>')
    .description('To add new component for CLI')
    .action((name) => {

        let componentDir = path.join(workspaceDir, 'components');
        process.chdir(componentDir);

        if (fs.existsSync(name)) {
            console.log("Component " + name + " already exist.");
            return;
        }

        fs.mkdirSync(name);
        process.chdir(name);

        let data = {
            component: name
        }

        freemarkerFile.renderFile(path.join(workspaceDir,'core', 'base.ftl'), data, (err, result) => {
            if (err) {
                throw new Error(err);
            }

            // add flag wx to prevent overriding existing file
            fs.writeFile(name + ".js", result, { flag: 'wx' }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Created component " + name);
                }
            });

        });
    });


//-- sample program
// program
//   .command('addContact <firstame> <lastname> <phone> <email>')
//   .alias('a')
//   .description('Add a contact')
//   .action((firstname, lastname, phone, email) => {
//     addContact({firstname, lastname, phone, email});
//   });

// dont delete this
program.parse(process.argv);