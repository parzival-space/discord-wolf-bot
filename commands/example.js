const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    // Dieser Befehl ist eine Beispiel-Forlage
    msg.channel.send("Fuck you!");
};

/**
 * Command description
 */
module.exports.help = {
    name: 'adminplease',
    description: 'Yup. I\'m a description',
    args: '',
    hidden: true,
    permissions: []
};