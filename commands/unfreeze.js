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
    if (user == undefined) return bot.sendError(msg.channel, "Member Not Found:You need to mention a target user!");

    var _cfg = bot.getGuildConfig(msg.guild);
    if (_cfg.freeze.find(f => f.user === user.id) == undefined) {
        return bot.sendError("Member Not Locked:You cant unfreeze users that are not frozen.");

    } else {
        var _data = [];
        _cfg.freeze.forEach(c => {
            if (c.user != user.id) _data.push({user: c.user, channel: c.channel});
        });
        bot.db.push('/' + user.guild.id + '/freeze', _data, true);
        return bot.sendInfo(msg.channel, "Member Unfrozen:Successfully unfroze <@!" + user.id + ">.");
    }

};

/**
 * Command description
 */
module.exports.help = {
    name: 'unfreeze',
    description: 'Allows users to move freely again.',
    args: '<mention>',
    hidden: true
};
