const DiscordJS = require('discord.js');

/**
 * @description Dieser Befehl ist nur zum Testen des Permissions Modul vorhanden
 * @author Parzival
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {

    var res = new DiscordJS.MessageEmbed()
        .setTitle("Loading...");
    msg.channel.send(res).then(x => {
        res.setTitle("");
        x.delete();
        var res1 = new DiscordJS.MessageEmbed();
        res1.addField("ADD_REACTIONS", msg.member.permissions.has("ADD_REACTIONS"), true);
        res1.addField("ADMINISTRATOR", msg.member.permissions.has("ADMINISTRATOR"), true);
        res1.addField("ATTACH_FILES", msg.member.permissions.has("ATTACH_FILES"), true);
        res1.addField("BAN_MEMBERS", msg.member.permissions.has("BAN_MEMBERS"), true);
        res1.addField("CHANGE_NICKNAME", msg.member.permissions.has("CHANGE_NICKNAME"), true);
        res1.addField("CONNECT", msg.member.permissions.has("CONNECT"), true);
        msg.channel.send(res1);
        var res2 = new DiscordJS.MessageEmbed();
        res2.addField("CREATE_INSTANT_INVITE", msg.member.permissions.has("CREATE_INSTANT_INVITE"), true);
        res2.addField("DEAFEN_MEMBERS", msg.member.permissions.has("DEAFEN_MEMBERS"), true);
        res2.addField("EMBED_LINKS", msg.member.permissions.has("EMBED_LINKS"), true);
        res2.addField("KICK_MEMBERS", msg.member.permissions.has("KICK_MEMBERS"), true);
        res2.addField("MANAGE_CHANNELS", msg.member.permissions.has("MANAGE_CHANNELS"), true);
        res2.addField("MANAGE_EMOJIS", msg.member.permissions.has("MANAGE_EMOJIS"), true);
        msg.channel.send(res2);
        var res3 = new DiscordJS.MessageEmbed();
        res3.addField("MANAGE_GUILD", msg.member.permissions.has("MANAGE_GUILD"), true);
        res3.addField("MANAGE_MESSAGES", msg.member.permissions.has("MANAGE_MESSAGES"), true);
        res3.addField("MANAGE_NICKNAMES", msg.member.permissions.has("MANAGE_NICKNAMES"), true);
        res3.addField("MANAGE_ROLES", msg.member.permissions.has("MANAGE_ROLES"), true);
        res3.addField("MANAGE_WEBHOOKS", msg.member.permissions.has("MANAGE_WEBHOOKS"), true);
        res3.addField("MENTION_EVERYONE", msg.member.permissions.has("MENTION_EVERYONE"), true);
        msg.channel.send(res3);
        var res4 = new DiscordJS.MessageEmbed();
        res4.addField("MOVE_MEMBERS", msg.member.permissions.has("MOVE_MEMBERS"), true);
        res4.addField("MUTE_MEMBERS", msg.member.permissions.has("MUTE_MEMBERS"), true);
        res4.addField("PRIORITY_SPEAKER", msg.member.permissions.has("PRIORITY_SPEAKER"), true);
        res4.addField("READ_MESSAGE_HISTORY", msg.member.permissions.has("READ_MESSAGE_HISTORY"), true);
        res4.addField("SEND_MESSAGES", msg.member.permissions.has("SEND_MESSAGES"), true);
        res4.addField("SEND_TTS_MESSAGES", msg.member.permissions.has("SEND_TTS_MESSAGES"), true);
        msg.channel.send(res4);
        var res5 = new DiscordJS.MessageEmbed();
        res5.addField("SPEAK", msg.member.permissions.has("SPEAK"), true);
        res5.addField("STREAM", msg.member.permissions.has("STREAM"), true);
        res5.addField("USE_EXTERNAL_EMOJIS", msg.member.permissions.has("USE_EXTERNAL_EMOJIS"), true);
        res5.addField("USE_VAD", msg.member.permissions.has("USE_VAD"), true);
        res5.addField("VIEW_AUDIT_LOG", msg.member.permissions.has("VIEW_AUDIT_LOG"), true);
        res5.addField("VIEW_CHANNEL", msg.member.permissions.has("VIEW_CHANNEL"), true);
        msg.channel.send(res5);
        var res6 = new DiscordJS.MessageEmbed();
        res6.addField("VIEW_GUILD_INSIGHTS", msg.member.permissions.has("VIEW_GUILD_INSIGHTS"), true);
        msg.channel.send(res6);
    });


};

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Befehls bereit. 
 */
module.exports.help = {
    name: 'testperms',
    description: 'Testing your Permissions?',
    args: '[number]',
    hidden: true,
    permissions: [
        "ADMINISTRATOR"
    ]
};