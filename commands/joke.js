const DiscordJS = require('discord.js');
const {getRandomJoke} = require('one-liner-joke');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    msg.channel.send(getRandomJoke({exclude_tags: []}).body);
};

/**
 * Command description
 */
module.exports.help = {
    name: 'joke',
    description: 'Random Jokes ^.^',
    args: '',
    hidden: false
};
