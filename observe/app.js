#!/usr/bin/env node

import debounce from 'lodash.debounce';
import chokidar from 'chokidar';
import program from 'caporal';
import fs from 'fs';
import {spawn} from 'child_process';
import chalk from 'chalk';

program
    .version('0.0.1')
    .argument('[filename]','fileName to execute')
    .action(async ({filename}) =>{
        const name = filename || 'app.js';
        // check if the file on the drive
        try{
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`could not find the file ${name}`);
        }

let proc;
const start = debounce(() => {
    if (proc){
        proc.kill();
    }
    console.log(chalk.bold("----starting----"));
    proc = spawn('node',[name],{stdio: 'inherit'});
}, 100);

chokidar.watch('.')
    .on('add', start)
    .on('change', start)
    .on('unlink', start);
    });

program.parse(process.argv);

