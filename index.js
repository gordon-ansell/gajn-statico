#!/usr/bin/env node
/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { syslog } = require('gajn-framework');
const ProcessArgs = require('./src/processArgs');
const Statico = require('./src/statico');
require('dotenv').config();

try {

    // Grab the process arguments.    
    const pa = new ProcessArgs();

    // Unhandled promise rejections.
    process.on("unhandledRejection", (error, promise) => {
        syslog.critical("Unhandled promise rejection.");
        syslog.exception(error);
        process.exitCode = 1;
    });

    // Uncaught exception.
    process.on("uncaughtException", error => {
        syslog.critical("Uncaught exception.");
        syslog.exception(error);
        process.exitCode = 1;
    });

    // Rejection handled.
    process.on("rejectionHandled", promise => {
        syslog.warning("A promise rejection was handled asynchronously.");
        syslog.inspect(promise, "warning", "Promise object");
    });    

    // .env
    let logLevel = process.env.LOG_LEVEL || 'notice';
    let logContexts = process.env.LOG_CONTEXTS || [];

    // Start up statico.
    let statico = new Statico(null, null, logLevel, logContexts, pa);

    async () => {
        let ret = await statico.init();
        if (ret) {
            ret = await statico.run();
        }
    }

    return ret;

    /*
    return statico.init().then(function() {
        return statico.run();
    });
    */

} catch (err) {
    syslog.critical(`Critical error. Black hole. Call interplanetary help.`);
    syslog.exception(err);
    process.exitCode = 1;
}