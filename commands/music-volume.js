const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl ändert die aktuelle Lautstärke
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Lese Server-Daten aus Arbeitsspeicher
    var s = -1;
    bot.music.server.forEach((c, i) => {
        if (c.id === msg.guild.id) s = i;
    });
    if (s == -1) return console.error("Fehler 404: Server not found!");

    // Keine Argumente
    if (!args[0]) ShowVolume();
    else if(!Number(args[0])) ShowVolume();
    else {
        ChangeVolume();
    }

    // Ändert die aktuelle Lautstärke
    function ChangeVolume() {
        // Ist die Lautstärke über 100%?
        var input = Number(args[0]);
        if ((input > 100) && (args[1] != "--overwrite")) {
            // Wenn das --overwrite tag nicht gegeben  ist werden keine Lautstärken über 100% erlaubt
            var res = new DiscordJS.MessageEmbed()
                .setAuthor(`${bot.user.username} - Volume`, bot.user.avatarURL())
                .setTitle(`Maximum volume exceeded`)
                .setColor(0x000000)
                .setDescription(`Volumes above 100% are not allowed.`);
            return msg.channel.send(res);
        }

        // Speichert die neue Lautstärke
        var cfg = bot.getGuildConfig(msg.guild);
        bot.music.server[s].volume = parseFloat(args[0]/100);
        if(bot.music.server[s].dispatcher) bot.music.server[s].dispatcher.setVolume(parseFloat(args[0]/100));
        cfg.options.volume = parseFloat(args[0]/100);
        bot.setGuildConfig(msg.guild, cfg);

        // Antworten ist wichtig!
        var volume = bot.music.server[s].volume;
        var res = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Volume`, bot.user.avatarURL())
            .setTitle(`Volume: ${(volume * 100)}%`)
            .setColor(0x000000)
            .setDescription(`The current playback volume is ${(volume * 100)}%.`);
        return msg.channel.send(res);
    }

    // Zeigt die aktuelle Lautstärke
    function ShowVolume() {
        // Ab einer Lautstärke von 85% kann die Klangqualität leiden.
        var volume = bot.music.server[s].volume;

        // Zeige Lautstärke
        var res = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Volume`, bot.user.avatarURL())
            .setTitle(`Volume: ${(volume * 100)}%`)
            .setColor(0x000000)
            .setDescription(`The current playback volume is ${(volume * 100)}%.`);
        
        // Ist die Lautstärke höher als 85% wird der Benutze gewarnt.
        if (volume > 1) res.setDescription(`The current playback volume is ${(volume * 100)}%.\nAudio quality may be reduced.`);
        return msg.channel.send(res);
    }

};

/**
 * Command description
 */
module.exports.help = {
    name: 'volume',
    description: 'Changes or shows the current playback volume.',
    args: '[volume]',
    hidden: false,
    permissions: [
        "CONNECT"
    ]
};