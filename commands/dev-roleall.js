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
    var ids = [];
    args.forEach(arg => {ids.push(arg.replace('<@', '').replace('!','').replace('&','').replace('>',''));});
    ids.forEach(id => {msg.channel.send(id);});

    msg.channel.send("executing...");

    var members = msg.guild.members.cache;
    members.forEach(mem => {
        msg.channel.send(`Current User: ${mem.user.username}`);
        ids.forEach(id => {
            mem.roles.add(id, "Dev-Command");
        })
    })
};

/**
 * Command description
 */
module.exports.help = {
    name: 'roleall',
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