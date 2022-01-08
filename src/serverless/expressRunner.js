/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const e = require('express');
const express = require('express');
const fs = require('fs');
const { syslog } = require('gajn-framework');
const path = require('path');

/**
 * Express runner class.
 */
class ExpressRunner
{
    /**
     * Runs express.
     *
     * @return  {number}  Return code.
     */
    run(input)
    {
        const app = express();
        const port = 3000;

        app.get('/', (req, res) => {
            let f = path.join(input, '_sl', 'contact', 'form', 'index.html');
            let f = "/Users/gordonansell/Dev/gordonansell.com/_sl/contact/form/index.html";
            if (!fs.existsSync(f)) {
                syslog.error(`File ${f} not found.`)
            } else {
                res.sendFile(f);
            }
        });
          
        app.listen(port, () => {
            syslog.notice(`Statico serverless listening at http://localhost:${port}`)
        });

        return 0;
    }
}

module.exports = ExpressRunner;
 