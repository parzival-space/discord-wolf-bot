const DiscordJS = require('discord.js');

/**
 * Generates a help message from all command files
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = function (bot, msg, args) {

    /* Setting site index */
    var si = args[0] - 1;
    if (!args[0]) si = 0;
    var commandsPerSite = 10;

    /* Adding sites */
    var sites = [[]];
    var i = 0; var c = 0; var cc = 0;
    bot.commands.forEach(command => {
        /* Adding command to menu */
        if (!command.help.hidden) {
            c++; cc++;
            sites[i].push({
                name: command.help.name,
                description: command.help.description,
                args: command.help.args
            });
        }
        if (c >= commandsPerSite) {
            i++; c = 0;
            sites[i] = [];
        }
    });

    /* Tests if site index is higher than the count of aviable sites */
    if (si > sites.length - 1) return message.channel.send(`You can only select page 1 to ${sites.length}`).then(msg => msg.delete(5000));

    /* creates helf message */
    var prefix = bot.getGuildConfig(msg.guild).prefix;
    var embed = new DiscordJS.RichEmbed()
        .setAuthor(`${bot.user.username} - Help`, bot.user.avatarURL)
        .setTitle(`Use _${prefix}${module.exports.help.name} [1-${sites.length}]_  to change the current site.`)
        .setColor(bot.cfg.colors.announce)
        .setFooter(`Site ${(si + 1)} of ${sites.length} | ${cc} registered commands | ${commandsPerSite} commands per site`);
    sites[si].forEach((command) => {
        embed.addField(`${prefix}${command.name} ${command.args}`, `${command.description}`, false);
    });

    return msg.channel.send(embed);

};

/**
 * Command description
 */
module.exports.help = {
    name: 'help',
    description: 'Shows this help page.',
    args: '[number]',
    hidden: false
};