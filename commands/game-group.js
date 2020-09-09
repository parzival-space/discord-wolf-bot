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
    msg.channel.send("Loading...");
    var sourceGroup = msg.guild.channels.cache.find(cat => cat.id == args[0]);
    if ((sourceGroup == undefined)||(sourceGroup.type != "category")) return msg.channel.send("Failed!");

    msg.channel.send("Creating copy of " + sourceGroup.name);

    var sourceChilds = [];
    msg.guild.channels.cache.forEach((chan) => {
        if (chan.parentID == sourceGroup.id) sourceChilds.push(chan);
    })

    msg.channel.send("Name: " + args[1]);
    msg.guild.channels.create(args[1], {type: "category"}).then((chan) => {
        sourceChilds.forEach((ch) => {
            msg.guild.channels.create(ch.name, {parent: chan, permissionOverwrites: ch.permissionOverwrites, position: ch.position, type: ch.type})
        });
    });
};

/**
 * Command description
 */
module.exports.help = {
    name: 'copygroup',
    alias: [],
    description: 'Yup. I\'m a description',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: true,
    disabled: false,
    hidden: false,
    permissions: [
        "ADMINISTRATOR"
    ]
};