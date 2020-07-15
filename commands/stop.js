const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    if (msg.guild.voiceConnection) {
        //msg.guild.voiceConnection.disconnect();
        var i = -1; var c = 0;
        bot.music.data.forEach(d => {
            if (d.server === msg.guild.id) i = c;
            c = c + 1;
        });
        if (i != -1) {
            bot.music.data[i].dispatcher.destroy();
        }
    }
    else return bot.sendError(msg.channel, "No Playback:There is currently no active playback that can be stopped.");
};

/**
 * Command description
 */
module.exports.help = {
    name: 'stop',
    description: 'Stops the current playback.',
    args: '',
    hidden: false
};
