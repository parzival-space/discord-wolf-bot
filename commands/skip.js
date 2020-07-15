const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    
    var i = -1; var c = 0;
    bot.music.data.forEach(d => {
        if (d.server === msg.guild.id) i = c;
        c = c + 1;
    });

    if(i == -1) return bot.sendError(msg.channel, "No Playback:There is currently no active playback.");

    if(bot.music.data[i].dispatcher) bot.music.data[i].dispatcher.end();
};

/**
 * Command description
 */
module.exports.help = {
    name: 'skip',
    description: 'Skips the current song.',
    args: '',
    hidden: false
};
