const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

    var title = "";
    data.name.split('-').forEach(x => {
        title = `${title}${x.substr(0,1).toUpperCase() + x.substr(1)} `;
    });

    var m = new DiscordJS.RichEmbed();
    m.setAuthor(`${bot.user.username} - About`, bot.user.avatarURL);
    m.setTitle(title);
    m.setDescription(data.description);
    m.addField(`Version`, data.version, true);
    m.addField(`Author`, data.author.name, true);
    m.setImage('https://i.imgur.com/ZgUvmjb.jpg');
    msg.channel.send(m);

};

/**
 * Command description
 */
module.exports.help = {
    name: 'about',
    description: 'About me?! *blushes*',
    args: '',
    hidden: false
};
