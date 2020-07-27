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
    msg.channel.send("Hallo " + msg.author.username);
};

/**
 * Command description
 */
module.exports.help = {
    name: 'test',
    alias: [],
    description: 'Yup. I\'m a description',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: true,
    disabled: false,
    hidden: true,
    permissions: [
        "ADMINISTRATOR"
    ]
};