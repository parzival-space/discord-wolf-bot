const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Dieser Befehl ist eine Beispiel-Forlage

};

/**
 * Command description
 */
module.exports.help = {
    name: 'test',
    description: 'Yup. I\'m a description',
    args: '',
    hidden: true,
    permissions: [
        "ADMINISTRATOR"
    ]
};