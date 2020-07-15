const DiscordJS = require('discord.js');

/**
 * Example Event
 * Trigger: 'ready'
 */
module.exports.run = function (old, _member = new DiscordJS.GuildMember()) {
};

/**
 * Event description
 */
module.exports.help = {
    trigger: 'presenceUpdate'
};