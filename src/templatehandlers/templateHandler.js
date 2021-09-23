/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const path = require("path");
const fs = require('fs');
const { fsutils, syslog } = require('gajn-framework');
const TemplatePathUrl = require('../templatePathUrl');

/**
 * Base template handler.
 */
class TemplateHandler
{
    /**
     * Configs.
     * @member {Config}
     */
    config = {};

    /**
     * Constructor.
     * 
     * @param   {Config}      config         Configs.
     * 
     * @return  {TemplateHandler}
     */
    constructor(config)
    {
        this.config = config;
    }

    /**
     * Get the layout dir.
     * 
     * @return {string}
     */
    get layoutDir()
    {
        return this.config.layoutDir;
    }

    /**
     * Get the layout path.
     * 
     * @return {string}
     */
    get layoutPath()
    {
        return path.join(this.config.sitePath, this.config.layoutDir);
    }

    /**
     * Get the site path.
     * 
     * @return {string}
     */
    get sitePath()
    {
       return this.config.sitePath;
    }

    /**
     * Write a file.
     * 
     * @param   {string}    buffer      Buffer to write.
     * @param   {string}    ofn         Output file name.
     * @param   {string}    fp          Input file path.
     * 
     * @return  {void}
     */
    writeFile(buffer, ofn, fp)
    {
        fsutils.mkdirRecurse(path.dirname(ofn));
        fs.writeFileSync(ofn, buffer);
        let op = TemplatePathUrl.sh(ofn);
        //syslog.debug(`Wrote ${fp} ===> ${op}.`, 'TemplateHandler:Base');
        syslog.info(`Wrote ${fp} ===> ${op}.`);
    }
}

module.exports = TemplateHandler;
