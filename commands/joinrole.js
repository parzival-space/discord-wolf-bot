const DiscordJS = require('discord.js');

/**
 * @description Dieser Befehl ermöglicht die automatische vergebung von Rollen nachdem ein Nutzer dem Server beigetreten ist.
 * @author Parzival
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {

    // Es gibt mehrere Sub-Commands
    // add - Fügt eine Rolle zu dem Join-Role Setup hinzu
    // remove - Entfernt eine Rolle aus dem Join-Role Setup
    // disable - Deaktiviert das Join-Role Setup
    // enable - Aktiviert das Join-Role Setup
    // toggle - Schaltet das Join-Role Setup um

    // Es muss mindestens ein Argument angegeben sein.
    if (args.length < 1) {
        var prefix = bot.getGuildConfig(msg.guild).options.prefix;
        var err = new DiscordJS.MessageEmbed()
            .setTitle("You must provide at least one argument to use this command.")
            .setDescription(`Syntax: ${prefix}joinrole <enable/disable/add/remove/toggle> [@mention]`)
            .setThumbnail("https://i.imgur.com/L9H79Sj.png")
            .setAuthor("Missing argument", bot.user.avatarURL())
            .setColor(0x000000);
        return msg.channel.send(err);
    }

    // Jetzt werden verschiedenne Sub-Befehle überprüft.
    switch (args[0].toUpperCase()) {
        case "ADD":
            if (args.length < 2) return MissingArgument(bot, msg, args);
            Add(bot, msg, args);
            break;
        case "REMOVE":
            if (args.length < 2) return MissingArgument(bot, msg, args);
            Remove(bot, msg, args);
            break;
        case "ENABLE":
            Enable(bot, msg, args);
            break;
        case "DISABLE":
            Disable(bot, msg, args);
            break;
        case "TOGGLE":
            Toggle(bot, msg, args);
            break;

        default:
            // Ungültiger Sub-Befehl
            return SubUnknown(bot, msg, args);
            break;
    }
};

function Remove(bot, msg, args) {

    var roles = bot.getGuildConfig(msg.guild).options.joinrole.roles;
    var dataNew = bot.getGuildConfig(msg.guild);
    var rolesNew = [];
    args.forEach((arg, i) => {
        if (i != 0) {
            var roleid = arg.replace("<@&", "").replace(">", "");
            roles.forEach(role => {
                if (role != roleid) rolesNew.push(role);
            })
        }
    })
    dataNew.options.joinrole.roles = rolesNew;
    bot.setGuildConfig(msg.guild, dataNew);

    var res = new DiscordJS.MessageEmbed()
        .setDescription("The role(s) have been removed.")
        .setColor(0x000000)
        .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
        .setTitle(`Role(s) removed`);
    msg.channel.send(res);
}

function Add(bot, msg, args) {
    var roles = bot.getGuildConfig(msg.guild).options.joinrole.roles;
    var target = bot.user.client.guilds.cache.get(msg.guild.id);
    args.forEach((arg, i) => {
        if (i != 0) {
            var roleid = arg.replace("<@&", "").replace(">", "");
            var role = target.roles.cache.find(r => r.id == roleid);
            if (role != undefined) roles.push(role.id);
        }
    })
    var dataNew = bot.getGuildConfig(msg.guild);
    dataNew.options.joinrole.roles = roles;
    bot.setGuildConfig(msg.guild, dataNew);

    var res = new DiscordJS.MessageEmbed()
        .setDescription("The role(s) have been registered.")
        .setColor(0x000000)
        .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
        .setTitle(`Role(s) added`);
    msg.channel.send(res);
}

function MissingArgument(bot, msg, args) {
    var prefix = bot.getGuildConfig(msg.guild).options.prefix;
    var err = new DiscordJS.MessageEmbed()
        .setTitle("You need to mention at least one role.")
        .setDescription(`Syntax: ${prefix}joinrole <add/remove> <@mention>`)
        .setThumbnail("https://i.imgur.com/L9H79Sj.png")
        .setAuthor("Missing argument", bot.user.avatarURL())
        .setColor(0x000000);
    return msg.channel.send(err);
}

function Disable(bot, msg, args) {
    // Als erstes müssen wir abfragen wie der aktuelle Status ist
    var state = bot.getGuildConfig(msg.guild).options.joinrole.enabled;
    var stateString = "";
    var oldCfg = bot.getGuildConfig(msg.guild);
    if (state == true) {
        //Shalte die JoinROle aus
        oldCfg.options.joinrole.enabled = false;
        bot.setGuildConfig(msg.guild, oldCfg);
        var res = new DiscordJS.MessageEmbed()
            .setDescription("Server configuration successfully updated.")
            .setColor(0x000000)
            .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
            .setTitle(`Enabled: No`);
    } else {
        // Schalte das Modul ein
        oldCfg.options.joinrole.enabled = true;
        var res = new DiscordJS.MessageEmbed()
            .setDescription("The module is already disabled.")
            .setColor(0x000000)
            .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
            .setTitle(`Enabled: No`);
    }
    msg.channel.send(res);
}

function Enable(bot, msg, args) {
    // Als erstes müssen wir abfragen wie der aktuelle Status ist
    var state = bot.getGuildConfig(msg.guild).options.joinrole.enabled;
    var stateString = "";
    var oldCfg = bot.getGuildConfig(msg.guild);
    if (state == true) {
        //Shalte die JoinROle aus
        var res = new DiscordJS.MessageEmbed()
            .setDescription("The module is already enabled.")
            .setColor(0x000000)
            .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
            .setTitle(`Enabled: Yes`);
    } else {
        // Schalte das Modul ein
        oldCfg.options.joinrole.enabled = true;
        stateString = "Yes";
        bot.setGuildConfig(msg.guild, oldCfg);
        var res = new DiscordJS.MessageEmbed()
            .setDescription("Server configuration successfully updated.")
            .setColor(0x000000)
            .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
            .setTitle(`Enabled: Yes`);
    }
    msg.channel.send(res);
}

function Toggle(bot, msg, args) {
    // Als erstes müssen wir abfragen wie der aktuelle Status ist
    var state = bot.getGuildConfig(msg.guild).options.joinrole.enabled;
    var stateString = "";
    var oldCfg = bot.getGuildConfig(msg.guild);
    if (state == true) {
        //Shalte die JoinROle aus
        oldCfg.options.joinrole.enabled = false;
        stateString = "No";
    } else {
        // Schalte das Modul ein
        oldCfg.options.joinrole.enabled = true;
        stateString = "Yes";
    }
    bot.setGuildConfig(msg.guild, oldCfg);
    var res = new DiscordJS.MessageEmbed()
        .setDescription("Server configuration successfully updated.")
        .setColor(0x000000)
        .setAuthor(`${bot.user.username} - JoinRole`, bot.user.avatarURL())
        .setTitle(`Enabled: ${stateString}`);
    msg.channel.send(res);
}

function SubUnknown(bot, msg, args) {
    var prefix = bot.getGuildConfig(msg.guild).options.prefix;
    var err = new DiscordJS.MessageEmbed()
        .setTitle("There are only five subcommands.")
        .setDescription(`Syntax: ${prefix}joinrole <enable/disable/add/remove/toggle> [@mention]`)
        .setThumbnail("https://i.imgur.com/L9H79Sj.png")
        .setAuthor("Unknown subcommand", bot.user.avatarURL())
        .setColor(0x000000);
    return msg.channel.send(err);
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Befehls bereit. 
 */
module.exports.help = {
    name: 'joinrole',
    description: 'Allows you to configure the join-role module.',
    args: '<enable/disable/add/remove/toggle> [@mention]',
    hidden: false,
    permissions: [
        "MANAGE_ROLES",
        "CREATE_INSTANT_INVITE",
        "MANAGE_GUILD"
    ]
};