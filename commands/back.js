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

    var queue = [];
    if(bot.music.data[i].dispatcher.time < 5000) {
        bot.music.data[i].rewind.pop();
        queue.push(bot.music.data[i].rewind.pop());
        bot.music.data[i].rewind.splice(bot.music.data[i].rewind.lenght - 1, 1);
        bot.music.data[i].queue.forEach(title => {
            queue.push(title);
        });
        bot.music.data[i].queue = queue;
    } else {
        queue.push(bot.music.data[i].rewind.pop());
        bot.music.data[i].rewind.splice(bot.music.data[i].rewind.lenght - 1, 1);
        bot.music.data[i].queue.forEach(title => {
            queue.push(title);
        });
        bot.music.data[i].queue = queue;
    }
    
    bot.music.data[i].dispatcher.end();
};

/**
 * Command description
 */
module.exports.help = {
    name: 'back',
    description: 'Plays the previous song.',
    args: '',
    hidden: false
};
