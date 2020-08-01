const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    var complete = new DiscordJS.MessageEmbed()
        .setAuthor(`${bot.user.username} - Bulk delete`, bot.user.avatarURL())
        .setThumbnail("https://i.imgur.com/teJBrBV.png")
        .setColor(0x000000);
    msg.channel.bulkDelete((Number(args[0]) || 10), false).then((dmsg) => {
        complete.setTitle("Bulk delete completed").setDescription(`Successfully deleted ${dmsg.array().length} messages.`);
        msg.channel.send(complete);
    }).catch(() => {
        complete.setTitle("Incomplete bulk delete").setDescription(`The bulk deletion did not complete successfully.`);
        msg.channel.send(complete);
    })
};

/**
 * Command description
 */
module.exports.help = {
    name: 'clear',
    alias: [
        'bulk',
        'purge'
    ],
    description: 'Bulk delete messages.',
    args: '[number]',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "MANAGE_MESSAGES"
    ]
};