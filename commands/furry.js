const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Warum es diesen Befehl gibt?
    // Warum nicht?
    var seed = Math.floor(Math.random() * (99999 - 10000) + 10000);
    var url = `https://thisfursonadoesnotexist.com/v2/jpgs-2x/seed${seed}.jpg`

    var m = new DiscordJS.MessageEmbed()
        .setAuthor(`${bot.user.username} - TFDNE`, bot.user.avatarURL())
        .setTitle("View this Image")
        .setURL(url)
        .setColor(0x000000)
        .setDescription(`Seed: ${seed}`)
        .setImage(url)
        .setFooter('Provided by thisfursonadoesnotexist.com');
    return msg.channel.send(m);
};

/**
 * Command description
 */
module.exports.help = {
    name: 'tfdne',
    alias: [],
    description: 'Shows you a random AI generated Fursona.',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: true,
    permissions: [
        "SEND_MESSAGES"
    ]
};