const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

};

/**
 * Command description
 */
module.exports.help = {
    name: 'example',
    description: 'Example command',
    args: '<example> [example]',
    hidden: true
};
