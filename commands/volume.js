const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    if (!args[0]) {
        /** Return Volume */
        return bot.sendInfo(msg.channel, `Volume Info:The current volume is **${bot.getGuildConfig(msg.guild).volume * 100}%**`);
    } else {
        /** Yeah... Protect your ears. */
        if ((args[0] > 100) && (args[1] != "--overwrite")) return bot.sendWarning(msg.channel, "Volume To High:The volume has to be a number between 0 and 100.");

        /** Apply changes */
        bot.db.push('/' + msg.guild.id + '/volume', parseFloat(args[0]/100), true);
        var i = -1; var c = 0;
        bot.music.data.forEach(d => {
            if (d.server === msg.guild.id) i = c;
            c = c + 1;
        });
        if (i > -1) { if (bot.music.data[i].dispatcher) bot.music.data[i].dispatcher.setVolume(args[0]/100); }
        if(args[0] >= 80) {
            return bot.sendWarning(msg.channel, `Volume Warning:The current volume is **${args[0]}%**. The quality is reduced.`);
        } else {
            return bot.sendInfo(msg.channel, `Volume Info:The current volume is **${args[0]}%**.`);
        }
    }
};

/**
 * Command description
 */
module.exports.help = {
    name: 'volume',
    description: 'Sets or shows the player\'s volume. (Default 20)',
    args: '[number]',
    hidden: false
};
