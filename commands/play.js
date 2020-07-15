const DiscordJS = require('discord.js');
const ytSearch = require('yt-search');
const fetchVideoInfo = require('youtube-info');
const isUrl = require('is-url');
const yt = require('youtube-feeds');
const getVideoId = require('get-video-id');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    if (!args[0]) return bot.sendError(msg.channel, "Missing Arguments:Syntax: play <link/search query>");
    if (!msg.member.voiceChannel) return bot.sendError(msg.channel, "No Voice Channel:You have to be in a voice channel to use this command.");

    if (isUrl(args[0])) {
        // Prüfe ob video exitiert
        videoCheck(getVideoId(args[0]).id, (exist) => {
            if (exist) {
                if (bot.music.data.find(d => d.server === msg.guild.id) === undefined) {
                    var _newData = {
                        server: 0,
                        queue: [],
                        rewind: [],
                        volume: 0.20
                    };
                    _newData.volume = bot.getGuildConfig(msg.guild).volume;
                    _newData.server = msg.guild.id;
                    _newData.queue.push(`${args[0]}`);
                    bot.music.data.push(_newData);
                } else {
                    var i = -1; var c = 0;
                    bot.music.data.forEach(d => {
                        if (d.server === msg.guild.id) i = c;
                        c = c + 1;
                    });
                    bot.music.data[i].queue.push(`${args[0]}`);
                }
            } else {
                
                if (!_results.videos[0]) return bot.sendWarning(msg.channel, "No Result Found:No result were found matching your search query.");
            }
        })
        
    } else {

        /** Transforms the search query words from raw words to one string */
        var _searchQuery = "";
        args.forEach(arg => _searchQuery = `${_searchQuery}${arg} `);

        /** Search video using the search query */
        ytSearch(_searchQuery, (err, _results) => {
            if (err) bot.sendError(msg.channel, err);
            if (!_results.videos[0]) return bot.sendWarning(msg.channel, "No Result Found:No result were found matching your search query.");

            /** Collect Videoinfo */
            var _video = _results.videos[0];

            /** Add song to playlist */
            if (bot.music.data.find(d => d.server === msg.guild.id) === undefined) {
                var _newData = {
                    server: 0,
                    queue: [],
                    rewind: [],
                    volume: 0.20
                };
                _newData.volume = bot.getGuildConfig(msg.guild).volume;
                _newData.server = msg.guild.id;
                _newData.queue.push(`www.youtube.com${_video.url}`);
                bot.music.data.push(_newData);
            } else {
                var i = -1; var c = 0;
                bot.music.data.forEach(d => {
                    if (d.server === msg.guild.id) i = c;
                    c = c + 1;
                });
                bot.music.data[i].queue.push(`www.youtube.com${_video.url}`);
            }
        });
    }

    /** Enter chanel or add to playlist */
    if (!msg.guild.voiceConnection) {
        msg.member.voiceChannel.join().then(con => bot.music.player(con,msg));
    } else {
        fetchVideoInfo(_video.videoId).then(_data => {
            msg.channel.send(`**${_data.title} has beed added to the playlist.** :musical_note: `);
        });
    }

    
    
};
function videoCheck(youtubeId, callback) {
    youtube.video(youtubeId, function(err, result) {
        var exists;
        exists = result.id === youtubeId;
        callback (exists);
    });
};

/**
 * Command description
 */
module.exports.help = {
    name: 'play',
    description: 'Loads your input and adds it to the queue.',
    args: '<link/search query>',
    hidden: false
};
