'use strict';

const libQ = require('kew');
const fs = require('fs-extra');
const VConf = require('v-conf');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;


module.exports = BienophoneRadioPlugin;

class BienophoneRadioPlugin {
    constructor(context) {
        this.context = context;
        this.commandRouter = this.context.coreCommand;
        this.logger = this.context.logger;
        this.configManager = this.context.configManager;
    }

    onVolumioStart() {
        const configFile = this.commandRouter.pluginManager.getConfigurationFile(this.context, 'config.json');
        this.config = new VConf();
        this.config.loadFile(configFile);

        return libQ.resolve();
    }

    onStart() {
        const defer = libQ.defer();
        // Once the Plugin has successfull started resolve the promise
        defer.resolve();

        return defer.promise;
    }

    onStop() {
        const self = this;
        const defer = libQ.defer();
        // Once the Plugin has successfull stopped resolve the promise
        defer.resolve();

        return libQ.resolve();
    }

    // Configuration Methods -----------------------------------------------------------------------------
    getUIConfig() {
        const defer = libQ.defer();
        const self = this;

        const lang_code = this.commandRouter.sharedVars.get('language_code');

        self.commandRouter.i18nJson(__dirname + '/i18n/strings_' + lang_code + '.json',
            __dirname + '/i18n/strings_en.json',
            __dirname + '/UIConfig.json')
            .then(function (uiconf) {


                defer.resolve(uiconf);
            })
            .fail(function () {
                defer.reject(new Error());
            });

        return defer.promise;
    }

    getConfigurationFiles() {
        return ['config.json'];
    }

    setUIConfig(data) {
        //Perform your installation tasks here
    }

    getConf(varName) {
        const self = this;
        //Perform your installation tasks here
    }

    setConf(varName, varValue) {
        const self = this;
        //Perform your installation tasks here
    }
}
