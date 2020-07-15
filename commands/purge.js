const DiscordJS = require('discord.js');

/**
 * Example Command
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

    var _channel = msg.channel;
    var _amount = 10;
    var _result = new DiscordJS.RichEmbed();

    if (args.length > 0) _amount = parseInt(args[0]);
    
    return msg.channel.fetchMessages({ limit: _amount })
        .then(messages => {
            msg.channel.bulkDelete(messages)
                .then(() => {
                    _result.setAuthor(`${bot.user.username} - Purge`, bot.user.avatarURL);
                    _result.setColor(bot.cfg.colors.announce);
                    _result.setTitle("Success!");
                    _result.setDescription(`Successfully bulk deleted ${_amount} messages.`);
                    msg.channel.send(_result).then(_msg => _msg.delete(10000));
                })
                .catch(reason => {
                    bot.sendError(msg.channel, reason);
                });
        })
        .catch(reason => {
            bot.sendError(msg.channel, reason);
        });

};

/**
 * Command description
 */
module.exports.help = {
    name: 'purge',
    description: 'Deletes a certain number of messages. (Default 10)',
    args: '[amount]',
    hidden: false
};
