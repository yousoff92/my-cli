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