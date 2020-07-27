const DiscordJS = require('discord.js');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    if (msg.guild.voice) {
        if (msg.guild.voice.connection) {
            stopVoice(bot, msg, args);
            msg.channel.send(`**${msg.author.username}** stopped the current playback.`);
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

    // Trenne die Verbindung
    msg.guild.voice.connection.disconnect();

    // Lösche dispatcher
    bot.music.server[s].queue = [];
    return bot.music.server[s].dispatcher.destroy();
}

/**
 * Command description
 */
module.exports.help = {
    name: 'stop',
    alias: [],
    description: 'Stops the current playback.',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "CONNECT"
    ]
};