const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt den Avatar der Person die erwähnt wurde oder die den Befehl ausgefphrt hat.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Wurden eine Person erwähnt?
    var user = msg.author;
    if (args[0]) {
        var target = msg.guild.members.cache.find(m => m.id === args[0].replace("<@!", "").replace("<@&", "").replace(">", ""));
        if (target != undefined) user = target.user;
        else {
            var m = new DiscordJS.MessageEmbed()
                .setAuthor(`${bot.user.username} - Avatar`, bot.user.avatarURL())
                .setTitle("User not found")
                .setDescription("Sorry, I couldn't find that user.")
                .setImage('https://i.imgur.com/L9H79Sj.png');
            return msg.channel.send(m);
        }
    }
    var url = user.avatarURL({size: 4096, dynamic: true});
    var res = new DiscordJS.MessageEmbed()
        .setAuthor(`${bot.user.username} - Avatar`, bot.user.avatarURL())
        .setTitle("Avatar URL")
        .setURL(`${url}`)
        .setColor(0x000000)
        .setDescription(`<@!${user.id}>'s Avatar`)
        .setImage(`${url}`);
    return msg.channel.send(res);
};

/**
 * Command description
 */
module.exports.help = {
    name: 'avatar',
    description: 'You want to see that picture?',
    args: '[@Mention]',
    hidden: false,
    permissions: [
        "ATTACH_FILES",
        "SEND_MESSAGES"
    ]
};