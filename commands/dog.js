const DiscordJS = require('discord.js');
const data = require('../package.json');
const request = require('request');

/**
 * Dieser Befehl zeigt ein zufälliges Hunde-Bild von random.dog an
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    request({uri: 'https://random.dog/woof'}, (err, res, body) => {
        if (err) return "";
        msg.channel.send("", {files:[`https://random.dog/${body}`]});
    })
};

/**
 * Command description
 */
module.exports.help = {
    name: 'dog',
    alias: [],
    description: 'Shows you a random picture of a dog.',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "SEND_MESSAGES"
    ]
};