const DiscordJS = require('discord.js');
const data = require('../package.json');
const request = require('request');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Dieser Befehl ist eine Beispiel-Forlage
    var x = bot.user.client;
    msg.channel.send(`${x.shard.count} / ${x.shard.ids.length}`)

};

/**
 * Command description
 */
module.exports.help = {
    name: 'sessions',
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