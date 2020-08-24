/**
 * @name wolf-music.js
 * @description Dieses Plugin wird zum laden und verarbeiten von Playlists und
 * @author Parzival
 * @version 1.1.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const DiscordJS = require('discord.js');
const ytdl = require('ytdl-core');

/**
 * @description Einstiegspunkt des Plugins
 * @param {DiscordJS.Client} bot Bot Instanze
 */
module.exports.run = function (bot) {
    // Im besten fall werden nur video ids angegeben die auch vorhanden sind.
    // Das Plugin geht davon aus.

    // Fügt zu der Bot-Instanze ein Modul hinzu, welches benötigt wird um Musik-Befehle zu verarbeiten.
    bot.music = {};
    bot.music.server = [{
        id: "default",
        queue: [/*{
            id: "videoID",
            title: "Default Title",
            url: "Default url",
            author: "Default Channel",
            image: "Default Image"

        }*/],
        rewind: [],
        volume: 0.20
    }];

    // Bereitet den Musikplayer dür alle Sever vor.
    bot.on("ready", () => {
        bot.guilds.cache.forEach(guild => {
            var entry = {
                id: guild.id,
                queue: [],
                rewind: [],
                volume: 0.20
            };
            entry.id = guild.id;
            entry.volume = bot.getGuildConfig(guild).options.volume;
            bot.music.server.push(entry);
        });
    });

    /**
     * @description Fügt eine PlayAudio-Funktion hinzu die für die eigentliche wiedergabe zuständig ist.
     * @param {DiscordJS.VoiceConnection} connection Die aktuelle Verbindung
     * @param {DiscordJS.Message} msg Ausführende Nachricht
     * @author Parzival
     */
    bot.music.playAudio = async function (connection, msg) {
        // Lese Server-Daten aus Arbeitsspeicher
        var s = -1;
        bot.music.server.forEach((c, i) => {
            if (c.id === connection.channel.guild.id) s = i;
        });
        if (s == -1) return;

        // Deaktiviert die Audio-Aufnahme des Bots um performance einbuse zu verhindern.
        if (!connection.voice.serverDeaf) {
            connection.voice.setDeaf(true, "I dont want to hear you. Thats all.");
        }

        // Erstellt einen PLatzhalter für eine Statusnachricht
        var server = bot.music.server[s];
        var res = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
            .setTitle(`${server.queue[0].title}`)
            .setURL(`${server.queue[0].url}`)
            .setDescription(`by ${server.queue[0].author}`)
            .setImage(`${server.queue[0].image}`)
            .addField(`Likes`, server.queue[0].likes, true)
            .addField(`Dislikes`, server.queue[0].dislikes, true)
            .setColor(0x000000);
        msg.channel.send(res);

        // Fügt den aktuellen Titel zu Rewind-Playlist hinzu.
        bot.music.server[s].rewind.push(server.queue[0]);

        // Streame nur Audio; Kein Video
        try {
            bot.music.server[s].dispatcher = connection.play(ytdl(bot.music.server[s].queue[0].url, {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }), {
                highWaterMark: 1,
                seek: 0,
                volume: bot.music.server[s].volume
            });
            console.log(`Streaming audio '${bot.music.server[s].queue[0].title}' from YouTube to guild '${connection.channel.guild.name}'...`);
        } catch (e) {
            console.error(e);
        }

        // Beendet den Stream sollte kein weitere EIntrag verfügbar
        bot.music.server[s].dispatcher.once("finish", () => {
            // Lösche das erste Element in der Playlist
            bot.music.server[s].queue.shift();
            if (bot.music.server[s].queue[0]) {
                // Spiele nächstes Lied
                bot.music.playAudio(connection, msg);
            } else {
                // Beendet die Wiedergabe
                var out = new DiscordJS.MessageEmbed()
                    .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
                    .setTitle(`End of Playlist`)
                    .setDescription(`You reached the end of the playlist.`)
                    .setThumbnail(`https://i.imgur.com/2Lgokta.png`)
                    .setColor(0x000000);
                msg.channel.send(out);

                // Beende Wiedergabe
                bot.music.server[s].dispatcher.destroy();
                connection.disconnect();
            }
        });
    }


    ///////////////////////////////////////////////////////////////////////////////////
    // Dieser Teil des Moduls ist ein HARD REQUIREMENT von allen music-*.js Befehlen //
    ///////////////////////////////////////////////////////////////////////////////////

    var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

    var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
    var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

    /**
     * Loosely validate a URL `string`.
     *
     * @param {String} string
     * @return {Boolean}
     */

    bot.isUrl = function(string) {
        if (typeof string !== 'string') {
            return false;
        }

        var match = string.match(protocolAndDomainRE);
        if (!match) {
            return false;
        }

        var everythingAfterProtocol = match[1];
        if (!everythingAfterProtocol) {
            return false;
        }

        if (localhostDomainRE.test(everythingAfterProtocol) ||
            nonLocalhostDomainRE.test(everythingAfterProtocol)) {
            return true;
        }

        return false;
    }
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 */
module.exports.help = {
    apiVersion: 2,
    pluginType: "ADDON",
    name: "wolf-music",
    enabled: true
}