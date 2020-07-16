const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

    var title = "";
    data.name.split('-').forEach(x => {
        title = `${title}${x.substr(0,1).toUpperCase() + x.substr(1)} `;
    });

    var m = new DiscordJS.MessageEmbed();
    m.setAuthor(`${bot.user.username} - About`, bot.user.avatarURL);
    m.setTitle(title);
    m.setDescription(data.description);
    m.addField(`Version`, data.version, true);
    m.addField(`Author`, `<@!${data.author.id}>`, true);
    m.setImage('https://i.imgur.com/TVY6FGJ.jpg');
    return msg.channel.send(m);

};

/**
 * Command description
 */
module.exports.help = {
    name: 'about',
    description: 'Displays information about the bot.',
    args: '',
    hidden: false,
    permissions: []
};
