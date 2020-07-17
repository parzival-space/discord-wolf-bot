const DiscordJS = require('discord.js');
const ytdl = require('ytdl-core');
const { getPreview } = require('spotify-url-info');
const search = require('yt-search');

/**
 * Dieser Befehl ermöglicht das hinzufügen von Videos und das starten einer Playlist
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Dieser Befehl unterstützt 2 verschiedenne Modi
    // 1 - Resume
    // 2 - Add Song

    // Ist der Benutzer überhaupt in einen Sprachkanal?
    var voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        var errVoice = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
            .setTitle(`Okay? Where?`)
            .setDescription(`You have to be in a channel to use this command.`)
            .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
            .setColor(0x000000);
        return msg.channel.send(errVoice);
    }

    // Als erstes überprüfen wir ob der Bot genug rechte zum beitreten hat.
    const botPerms = voiceChannel.permissionsFor(bot.user);
    if (!botPerms.has("CONNECT")) {
        var errConn = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
            .setTitle(`Permission Issue`)
            .setDescription(`I don't have the permission to join your channel.`)
            .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
            .addField("Missing Permission", "CONNECT")
            .setColor(0x000000);
        return msg.channel.send(errConn);
    }
    if (!botPerms.has("SPEAK")) {
        var errSpeak = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
            .setTitle(`Permission Issue`)
            .setDescription(`I don't have the permission to join your channel.`)
            .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
            .addField("Missing Permission", "SPEAK")
            .setColor(0x000000);
        return msg.channel.send(errSpeak);
    }

    // Entscheide den Modus abhängig davon ob Argumente gegeben sind oder nicht.
    if (args[0]) {
        // Füge ein neuen Eintrag der Playlist hinzu.

        // Überprüft ob das erste Argument eine URL ist
        if (bot.isUrl(args[0])) {
            // Es wurde eine URL angegeben
            // Hier können es unterschiedliche Provider sein.
            // Abhängig vom Provider werden entscheidung getroffen.

            if (args[0].includes("youtube.com")){
                // Wenn die angegebene URL ein Youtube Link ist kann die URL direkt übergeben werden.
                await AddYoutubeVideo(bot, msg, args, args[0]).catch((err) => {
                    // Bei einem Fehler brechen wir schnell ab.
                    var errInvalid = new DiscordJS.MessageEmbed()
                        .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
                        .setTitle(`Video not found.`)
                        .setDescription(`Sorry, I couldn't find the video on YouTube.`)
                        .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
                        .setColor(0x000000);
                    return msg.channel.send(errInvalid);
                });

            } else if (args[0].includes("open.spotify.com")) {
                // Wenn sich die URL um eine Spotify URL handlet, muss erst noch ein passendes YouTube Video gefunden werden.
                var info = await getPreview(args[0]);
                var searchQuery = `${info.artist} - ${info.title}`;

                // Bei Fehlern wird abgebrochen
                function SpotifyNotFound() {
                    var errInvalid = new DiscordJS.MessageEmbed()
                        .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
                        .setTitle(`Video not found.`)
                        .setDescription(`Sorry, I couldn't find the song on Spotify.`)
                        .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
                        .setColor(0x000000);
                    return msg.channel.send(errInvalid);
                }

                // Versuche das Lied auf Youtube zu finden.
                var result = await search(searchQuery).catch(() => { return SpotifyNotFound(); });
                
                // Versuche das Lied zur Playlist hinzu zu fügen
                var video = result.videos[0];
                await AddYoutubeVideo(bot, msg, args, video.url).catch(() => { return SpotifyNotFound(); });

            } else if (args[0].includes("soundcloud.com")) {
                // Soundcloud ist im Moment noch nicht unterstützt
                var errCloud = new DiscordJS.MessageEmbed()
                    .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
                    .setTitle(`Not supported.`)
                    .setDescription(`Soundcloud is currently not supported..`)
                    .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
                    .setColor(0x000000);
                return msg.channel.send(errCloud);
            }
        } else {
            // Es wurde keine URL angegeben.
            // Aus den Argumenten wird ein Text erzeugt der dann auf Youtube gesucht wird.

            var searchQuery = "";
            args.forEach((arg, i) => {
                searchQuery = `${searchQuery}${arg}`;
                if(i != (args.length - 1))searchQuery = `${searchQuery} `;
            });

            // Bei Fehlern wird abgebrochen
            function SongNotFound() {
                var errInvalid = new DiscordJS.MessageEmbed()
                    .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
                    .setTitle(`Song not found.`)
                    .setDescription(`Sorry, I couldn't find any matching song.`)
                    .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
                    .setColor(0x000000);
                return msg.channel.send(errInvalid);
            }

            // Versuche das Lied auf Youtube zu finden.
            var result = await search(searchQuery).catch(() => { return SongNotFound(); });
            
            // Versuche das Lied zur Playlist hinzu zu fügen
            var video = result.videos[0];
            await AddYoutubeVideo(bot, msg, args, video.url).catch(() => { return SongNotFound(); });
        }
    } else {
        // Es wurden keine Argumente angegeben.
        // Wenn die Wiedergabe pausiert ist, wird sie jetzt wieder fortgesetzt.
        
        var errPlay = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Music Player`, bot.user.avatarURL())
            .setTitle(`No active playback`)
            .setDescription(`No playback is currently active.`)
            .setThumbnail(`https://i.imgur.com/2Lgokta.png`)
            .setColor(0x000000);

        var s = -1;
        bot.music.server.forEach((c, i) => {
            if (c.id === msg.channel.guild.id) s = i;
        });
        if (s == -1) {
            return msg.channel.send(errPlay);
        };

        if (bot.music.server[s].dispatcher) {
            if (bot.music.server[s].dispatcher.paused) {
                bot.music.server[s].dispatcher.resume();
                msg.channel.send(`**${msg.author.tag}** resumed the current playback.`);
            }
        } else {
            return msg.channel.send(errPlay);
        }
    }



};

async function AddYoutubeVideo(bot, msg, args, url) {
    var songInfo = await ytdl.getInfo(url);
    
    // Jetzt wandeln wir nur die benötigten daten um
    const song = {
        id: songInfo.videoDetails.videoId,
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        author: songInfo.videoDetails.author.name,
        image: ` https://i.ytimg.com/vi/${songInfo.videoDetails.videoId}/hqdefault.jpg`,
        likes: songInfo.videoDetails.likes,
        dislikes: songInfo.videoDetails.dislikes,
    }

    // Falls der Server nicht bereits einen Eintrag hat, wird dieser hinzugefügt.
    if (bot.music.server.find(s => s.id === msg.channel.guild.id) == undefined) {
        bot.music.server.push({
            id: msg.channel.guild.id,
            queue: [],
            rewind: [],
            volume: 0.20
        })
    }

    // Findet den Index Wert des aktuellen Servers
    var s = -1;
    bot.music.server.forEach((c, i) => {
        if (c.id === msg.channel.guild.id) s = i;
    });

    // Fügt einen Neuen Eintrag zu der Playlist hinzu
    bot.music.server[s].queue.push(song);
    
    // Wenn der Bot in mit keinem Voice-Channel aktuell verbunden ist, tritt er jetzt einem bei.
    if (!msg.guild.voice) {
        // Der Bot hat sich zum ersten mal Verbunden
        msg.member.voice.channel.join().then(connection => {
            return bot.music.playAudio(connection, msg);
        })
    } else if (!msg.guild.voice.connection) {
        // Der Bot ist aktuell nicht verbunden
        msg.member.voice.channel.join().then(connection => {
            return bot.music.playAudio(connection, msg);
        })
    } else {
        // Der Bot ist aktuell in einer Verbindung
        msg.channel.send(`**${song.title}** has been added to the playlist.`);
    }
}


/**
 * Command description
 */
module.exports.help = {
    name: 'play',
    description: 'Plays a song with the given name or url.',
    args: '[url/search query]',
    hidden: false,
    permissions: [
        "CONNECT"
    ]
};