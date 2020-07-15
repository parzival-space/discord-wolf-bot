const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {
    if (!args[0]) return bot.sendError(msg.channel, "Missing Argument:You have to mention someone!");

    var user = msg.guild.members.find(m => m.id === args[0].replace('<@!', '').replace('>', ''));
    var channel = msg.guild.channels.find(c => c.id === args[1]);
    if (user == undefined) return bot.sendError(msg.channel, "Member Not Found:You need to mention a target user!");
    if (channel == undefined) {
        if (!user.voiceChannel) return bot.sendError(msg.channel, "No Channel Defined:You need to define a channel id.");
        channel = user.guild.channels.find(c => c.id === user.voiceChannelID);
    }

    var _cfg = bot.getGuildConfig(msg.guild);
    if (_cfg.freeze.find(f => f.user === user.id) == undefined) {

        var d = [];
        _cfg.freeze.forEach(c => d.push(c));
        d.push({user: user.id, channel: channel.id});
        bot.db.push('/' + user.guild.id + '/freeze/', d, true);
        bot.emit('voiceStateUpdate', (user, user));
        return bot.sendInfo(msg.channel, `Member Locked:Successfully locked <@!${user.id}> to channel ${channel.name}!`);

    } else {
        
        var _data = [];
        _cfg.freeze.forEach(c => {
            if (c.user != user.id) _data.push({user: c.user, channel: c.channel});
        });
        _data.push({user: user.id, channel: channel.id});
        bot.db.push('/' + user.guild.id + '/freeze/', _data, true);
        bot.emit('voiceStateUpdate', user, user);
        return bot.sendInfo(msg.channel, `Member Locked:Successfully locked <@!${user.id}> to channel ${channel.name}!`)
    }
};

/**
 * Command description
 */
module.exports.help = {
    name: 'freeze',
    description: 'Forces users to stay in a given channel',
    args: '<mention> [channelid]',
    hidden: true
};
