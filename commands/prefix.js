const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Ändert den Prefix oder zeigt den aktuellen Prefix an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Erhalte Server Konfiguration
    var server = bot.getGuildConfig(msg.guild);

    if (args[0]) {
        // Änder Prefis

        if (!msg.member.permissions.has("ADMINISTRATOR")) {
            var res = new DiscordJS.MessageEmbed();
            res.setTitle("Insufficient Permissions");
            res.setDescription("Your rights are not sufficient to use this command.\nIf you think this is an error, please contact the server team.");
            res.setThumbnail("https://i.imgur.com/uBRXask.png");
            res.setColor(0xFF0000);
            return msg.channel.send(res);
        }

        server.options.prefix = args[0];
        await bot.setGuildConfig(msg.guild, server);
        var m = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Prefix`, bot.user.avatarURL())
            .setTitle(`Prefix changed: ${server.options.prefix}`)
            .setColor(0x000000)
            .setDescription(`Successfully changed the prefix tp ${server.options.prefix}`);
        return msg.channel.send(m);
    } else {
        // Zeige aktuellen Prefix
        var m = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Prefix`, bot.user.avatarURL())
            .setTitle(`Current prefix: ${server.options.prefix}`)
            .setColor(0x000000)
            .setDescription(`The servers current prefix is ${server.options.prefix}.\nUse ${server.options.prefix}help if you need help.`);
        return msg.channel.send(m);
    }

};

/**
 * Command description
 */
module.exports.help = {
    name: 'prefix',
    alias: [],
    description: 'Changes or shows the servers prefix.',
    args: '[prefix]',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: true,
    permissions: []
};