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
    request({uri: 'https://some-random-api.ml/img/pikachu'}, (err, res, body) => {
        if (err) return "";
        msg.channel.send("",{files:[`${JSON.parse(body).link}`]});
    })
};

/**
 * Command description
 */
module.exports.help = {
    name: 'pikachu',
    alias: [],
    description: 'Shows you a random picture of Pikachu.',
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