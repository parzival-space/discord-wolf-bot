const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 * Last
 */
module.exports.run = async function (bot, msg, args) {
    var prefix = bot.getGuildConfig(msg.guild).options.prefix;

    var title = "";
    data.name.split('-').forEach(x => {
        title = `${title}${x.substr(0,1).toUpperCase() + x.substr(1)} `;
    });

    var m = new DiscordJS.MessageEmbed()
        .setAuthor(`${bot.user.username} - About`, bot.user.avatarURL())
        .setTitle(title)
        .setURL(data.url)
        .setColor(0x000000)
        .setDescription(data.description)
        .addField(`Version`, data.version, true)
        .addField(`Author`, `<@!${data.author.id}>`, true)
        .setImage('https://i.imgur.com/I96iTcf.jpg')
        .setFooter(`https://github.com/cyberfen/discord-raccoon-bot`);
    return msg.channel.send(m);

};

/**
 * Command description
 */
module.exports.help = {
    name: 'about',
    alias: [],
    description: 'Displays information about the bot.',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: []
};