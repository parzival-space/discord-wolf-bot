/**
 * Register some Modules
 */
const DiscordJS = require('discord.js');
const Express = require('express');
const JsonDB = require('node-json-db').JsonDB;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Creating new Bot Client Hallo
 */
const bot = new DiscordJS.Client();

/**
 * Creating HTTP, Express and Socket.IO Instance
 */
bot.app = Express();
bot.web = require('http').createServer(bot.app);
bot.io = require('socket.io')(bot.web);

/**
 * Connecting/Creating local Json Database
 */
bot.db = new JsonDB(path.join(__dirname, 'config', 'db.json'), true, true, '/');
bot.cfg = require('./config/bot.json');

/**
 * Creating Listener for glitch.com hosting.
 * This adress is used when you are pinging your application with UpTimeRobot
 */
bot.app.get('/uptime', (req, res) => {
    res.sendStatus(200);
});

/**
 * Loading Commands
 */
bot.commands = new DiscordJS.Collection();
fs.readdir('./commands/', (err, files) => {

    if(err) console.error(err);

    /* Collecting ONLY .js files */
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) return console.warn('No .js file in \'commands\' detected! Ignoring...');

    /* Adding files to command list */
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });

});


/**
 * Command Listener
 */
bot.on('message', (msg) => {

    /* Ignoring Bot & DM Messages */
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    /* Getting Prefix from Database */
    let prefix = bot.getGuildConfig(msg.guild).prefix;

    /* Checks if message is a command */
    if (msg.content.toString().split('')[0] === prefix) {

        let msgArrays = msg.content.toString().split(' ');
        let cmd = msgArrays[0];
        let args = msgArrays.slice(1);

        /* Executing Command */
        let cmdfile = bot.commands.get(cmd.slice(prefix.length));
        if (cmdfile) {
            cmdfile.run(bot, msg, args);
            msg.delete(500).catch(() => {});
            console.log(`${msg.author.tag} executed command '${prefix}${cmdfile.help.name}' in channel '${msg.channel.name}' on guild '${msg.guild.name}' with following arguments: '${args}'`);
        }
    }
});

/**
 * Loading Scripts
 */
fs.readdir('./scripts/', (err, files) => {

    if(err) console.error(err);

    /* Collecting ONLY .js files */
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) return console.warn('No .js file in \'script\' detected! Ignoring...');

    /* Executing Files */
    jsfiles.forEach((f, i) => {
        let script = require(`./scripts/${f}`);
        script.run(bot);
    });
});

/**
 * Loading Events
 */
fs.readdir('./events/', (err, files) => {

    if(err) console.error(err);

    /* Collecting ONLY .js files */
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) return console.warn('No .js file in \'events\' detected! Ignoring...');

    /* Adding Event listener */
    jsfiles.forEach((f, i) => {
        let script = require(`./events/${f}`);
        bot.on(script.help.trigger, script.run);
    });
});

/**
 * Overwriting bot.cb.getData
 * @param {string} dbpath
 * @returns {object}
 */
bot.db.getDataAlt = bot.db.getData;
bot.db.getData = function(dbpath) {
    var data = {};
    try {
        data = bot.db.getDataAlt(dbpath);
    } catch (err) {
        return;
    }
    return data;
};

/**
 * GetGuildConfig
 * @param {DiscordJS.Guild} guild
 * @returns {object}
 */
bot.getGuildConfig = function(guild) {

    /* Getting guild infos */
    var id = guild.id;

    /* Getting Data */
    var data = bot.db.getData(`/${id}`);

    if (!data) {

        /* Create a new Data Path if there is no existing */
        bot.db.push('/' + id + '/', bot.db.getData('/default'), true);
        return bot.db.getData(`/${id}`);

    } else return data;
    
};

/**
 * Creates a entry in the database for a new guild
 */
bot.on('guildCreate', (guild) => {
    console.log(`Joined new guild: ${guild.name}!`);

    /* Create a new Data Path if there is no existing */
    bot.db.push('/' + guild.id + '/', bot.db.getData('/default'), true);
});

/**
 * Connecting with Discord
 */
bot.login(process.env.TOKEN);

/**
 * Setting up db if not allready aviable
 */
bot.on('ready', () => {

    console.log(`${bot.user.tag} connected to ${bot.guilds.size} guild.`);

    /* Starting WebServer */
    var port = process.env.PORT || 3000;
    bot.web.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

/**
 * Overwriting console.log with color output
 */
function OverwriteConsoleLog() {
    var colors = require('colors/safe');
    var cmd = {
        error: console.error,
        warn: console.warn,
        log: console.log,
        info: console.info,
        debug: console.debug
    };
    console.error = function (msg) { if(bot.cfg.logging.error) cmd.error(colors.red(msg)); };
    console.warn = function (msg) { if(bot.cfg.logging.warn) cmd.warn(colors.yellow(msg)); };
    console.log = function (msg) { if(bot.cfg.logging.info) cmd.log(colors.white(msg)); };
    console.info = function (msg) { if(bot.cfg.logging.info) cmd.info(colors.white(msg)); };
    console.debug = function (msg) { if(bot.cfg.logging.debug) cmd.debug(colors.gray(msg)); };
} OverwriteConsoleLog();

/**
 * CTD Fix
 */
bot.on('error', (err) => console.error(err));
bot.on('warn', (warn) => console.warn(warn));
bot.on('debug', (debug) => console.debug(debug));
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

/**
 * Clears the CMD on start
 */
if(bot.cfg.logging.ClearCmdOnStart) console.clear();

/**
 * set up public folder
 */
bot.app.use('/static', Express.static(path.join(__dirname, 'public')));

/**
 * setting up renderer
 */
bot.app.set('view engine', 'ejs');

/**
 * Music Module
 */
const fetchVideoInfo = require('youtube-info');
const getYouTubeID = require('get-youtube-id');
const ytdl = require('ytdl-core');
bot.music = { };
bot.music.data = [{
    server: 0,
    queue: [],
    rewind: [],
    volume: 0.20
}];
bot.music.player = async function(connection = new DiscordJS.VoiceConnection(), msg) {

    /** Get Server data */
    var i = -1; var c = 0;
    bot.music.data.forEach(d => {
        if (d.server === msg.guild.id) i = c;
        c = c + 1;
    });


    /** Auto deafen the BOt to safe resources */
    bot.guilds.forEach(g => {
        g.members.find(m => m.id === bot.user.id).setDeaf(true);
    });
    
    /** Get Video ID */
    var _id = getYouTubeID(bot.music.data[i].queue[0]);

    /** Get Video info */
    fetchVideoInfo(`${_id}`).then(info => {
        var embed = new DiscordJS.RichEmbed();
        embed.setAuthor("Now playing:", bot.user.avatarURL);
        embed.setTitle(info.title);
        embed.setURL(info.url);
        embed.setDescription("by " + info.owner);
        embed.setImage(info.thumbnailUrl);
        embed.setColor(bot.cfg.colors.announce);
        msg.channel.send(embed);
        
        bot.music.data[i].rewind.push(info.url);

        console.log(`Streaming video '${info.title}' in channel '${connection.channel.name}' to guild '${connection.channel.guild.name}'`);
    });

    /** Streaming only Sounds */
    try {
        bot.music.data[i].dispatcher = connection.playStream(ytdl(bot.music.data[i].queue[0],  { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}), { highWaterMark: 1, seek: 0, volume: bot.music.volume });
        
        bot.music.data[i].dispatcher.setVolume(bot.music.data[i].volume);
    } catch (err) {
        bot.sendError(msg.channel, err);
    }

    bot.music.data[i].queue.shift();

    bot.music.data[i].dispatcher.on("end", () => {
        if (bot.music.data[i].queue[0]) bot.music.player(connection, msg);
        else {
            try {
                bot.sendInfo(msg.channel, "End Of Playlist:You reached the end of the playlist.");
                connection.disconnect();
                bot.music.data[i].dispatcher.destroy();
            } catch (err) {console.log(err);}
        }
    });
};

bot.sendError = function(channel, reason) {
    if (channel.id === undefined) return console.error("Error: No Channel given!");
    var _result = new DiscordJS.RichEmbed();
    _result.setAuthor(`${bot.user.username} - Error`, bot.user.avatarURL);
    _result.setColor(bot.cfg.colors.critical);
    var err = reason.toString().split(':', 2);
    _result.setTitle(err[0]);
    _result.setDescription(reason.substring(err[0].length + 1));
    channel.send(_result);
};
bot.sendWarning = function(channel, reason) {
    if (channel.id === undefined) return console.error("Error: No Channel given!");
    var _result = new DiscordJS.RichEmbed();
    _result.setAuthor(`${bot.user.username} - Warning`, bot.user.avatarURL);
    _result.setColor(bot.cfg.colors.warning);
    var err = reason.toString().split(':', 2);
    _result.setTitle(err[0]);
    _result.setDescription(reason.substring(err[0].length + 1));
    channel.send(_result);
};
bot.sendInfo = function(channel, reason) {
    if (channel.id === undefined) return console.error("Error: No Channel given!");
    var _result = new DiscordJS.RichEmbed();
    _result.setAuthor(`${bot.user.username} - Info`, bot.user.avatarURL);
    _result.setColor(bot.cfg.colors.announce);
    var err = reason.toString().split(':', 2);
    _result.setTitle(err[0]);
    _result.setDescription(reason.substring(err[0].length + 1));
    channel.send(_result);
};

bot.on("ready", () => {
    bot.user.setActivity("with problems.", {type: "LISTENING"});
});


bot.on('presenceUpdate', (o, _member) => {
    if (bot.getGuildConfig(_member.guild) === undefined) return;

    var _count = 0;
    var _config = bot.getGuildConfig(_member.guild).counter;

    var _channel = _member.guild.channels.find(c => c.id === _config.online.id);
    if (_channel == undefined) return;
    _member.guild.members.forEach(m => { if (m.presence.status != "offline" && m.user.bot != true) _count = _count + 1; });

    _channel.setName(_config.online.format.replace("{{COUNT}}", _count), "Update");
});
bot.on('guildMemberAdd', m => updateMembers(m));
bot.on('guildMemberRemove', m => updateMembers(m));
bot.on('guildMemberAvailable', m => updateMembers(m));
function updateMembers(_member = new DiscordJS.GuildMember()) {
    if (bot.getGuildConfig(_member.guild) === undefined) return;

    var _count = 0;
    var _config = bot.getGuildConfig(_member.guild).counter;

    var _channel = _member.guild.channels.find(c => c.id === _config.member.id);
    if (_channel == undefined) return;

    _member.guild.members.forEach(m => { if (m.user.bot != true) _count = _count + 1; });
    _channel.setName(_config.online.format.replace("{{COUNT}}", _count), "Update");
}

// FREEZE

bot.on('voiceStateUpdate', (om, nm) => {
    var cfg = bot.getGuildConfig(nm.guild);
    var data = cfg.freeze.find(f => f.user === nm.id);
    if (data === undefined) return;
    if (nm.voiceChannel) {
        if (nm.voiceChannel.id != data.channel) {
            var c = nm.guild.channels.find(c => c.id === data.channel);
            console.log(`${nm.user.tag} tried to change Channel! Moving user to channel ${c.name}.`);
            nm.setVoiceChannel(c).catch(console.error);
        }
    }
});