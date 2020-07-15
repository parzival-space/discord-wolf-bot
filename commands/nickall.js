const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

    var _members = msg.guild.members;
    var _nickname = "";
    var _success = 0;
    var _failed = 0;
    var _result = new DiscordJS.RichEmbed();
    var _loading = new DiscordJS.RichEmbed();

    if (args.length > 0) {
        args.forEach(arg => {
            _nickname = `${_nickname}${arg} `;
        });
    }

    _loading.setAuthor(`${bot.user.username} - Nickname All`, bot.user.avatarURL);
    _loading.setColor(bot.cfg.colors.announce);
    _loading.setTitle("Loading...");
    msg.channel.send(_loading).then(_msg => {

        
        _members.forEach(_member => {
            _member.setNickname(_nickname, `User ${msg.author.tag} executed command 'nickall'`)
                .then(() => {
                    _success = _success + 1;
                })
                .catch(() => {
                    _failed = _failed + 1;
                })
                .finally(() => {
                    if (_member == _members.last()) {
                        _msg.delete();
                        _result.setAuthor(`${bot.user.username} - Nickname All`, bot.user.avatarURL);
                        _result.setColor(bot.cfg.colors.announce);
                        _result.setTitle("Success!");
                        _result.setDescription(`Successfully changed nickname of all members to ${_nickname}`);
                        if (_nickname == "") _result.setDescription(`Successfully removed every nickname.`);
                        _result.addField(`Successfully`, _success, true);
                        _result.addField(`Failed`, _failed, true);
                        msg.channel.send(_result);
                    }
                });
        });
        
    });



};

/**
 * Command description
 */
module.exports.help = {
    name: 'nickall',
    description: 'Changes the nickname of all server members.',
    args: '[nickname]',
    hidden: true
};
