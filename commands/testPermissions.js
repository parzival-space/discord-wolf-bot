const DiscordJS = require('discord.js');

/**
 * @description Dieser Befehl ist nur zum Testen des Permissions Modul vorhanden
 * @author Parzival
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {



};

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Befehls bereit. 
 */
module.exports.help = {
    name: 'testperms',
    alias: [],
    description: 'Testing your Permissions?',
    args: '[number]',
    requireAlpha: false,
    requireBeta: false,
    requireDev: true,
    disabled: false,
    hidden: true,
    permissions: []
};