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
    request({uri: 'https://some-random-api.ml/img/red_panda'}, (err, res, body) => {
        if (err) return "";
        var img = JSON.parse(body).link;
        msg.channel.send("", {files:[img]});
    })
};

/**
 * Command description
 */
module.exports.help = {
    name: 'redpanda',
    alias: [],
    description: 'Shows you a random picture of a red panda.',
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