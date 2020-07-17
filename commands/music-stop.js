const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    if (msg.guild.voice) {
        if (msg.guild.voice.connection) {
            stopVoice(bot, msg, args);
        }
    } else {
        msg.channel.send("What do you want to stop? There is no active playback running.");
    }
};

function stopVoice(bot, msg, args) {
    // Lese Server-Daten aus Arbeitsspeicher
    var s = -1;
    bot.music.server.forEach((c, i) => {
        if (c.id === msg.channel.guild.id) s = i;
    });
    if (s == -1) return;

    return bot.music.server[s].dispatcher.destroy();
}

/**
 * Command description
 */
module.exports.help = {
    name: 'stop',
    description: 'Stops the current playback.',
    args: '',
    hidden: true,
    permissions: []
};