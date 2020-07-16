/**
 * @name joinrole.js
 * @description Erstellt ein universellen Handler der Rollen beim beitritt eines neuen Mitgliedes vergibt.
 * @author Parzival
 * @version 1.0.0.0
 */

// Dieses Plugin benötigt weitere Module die noch nachgeladen werden müssen.
const DiscordJS = require('discord.js');

/**
 * @description Einstiegspunkt des Plugins
 * @param {DiscordJS.Client} bot BOt Instanze
 */
module.exports.run = function(bot) {
    // Registriert ein Handler für neue Server Mitglieder
    bot.on('guildMemberAdd', (member) => {

        // Lade Konfiguration für den entsprechenden Server
        var data = bot.getGuildConfig(member.guild).options.joinrole;

        // Führe nur eine Aktion aus wenn das Modul auch aktiviert ist.
        if (data.enabled != true) return;

        // Vergebe Rollen sollten welche defeniert worden sein.
        data.roles.forEach(roleid => {
            
            // Lese Cache des Server aus.
            var target = bot.user.client.guilds.cache.get(member.guild.id);
            var role = target.roles.cache.find(r => r.id == roleid);

            // Vegebe Rolle falls vorhanden
            if (role != undefined) {
                member.roles.add(role, "Joinrole Module Enabled").catch(() => {});
            }
        });

    });
}

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Plugins bereit. 
 * API v2: Übergibt einfache Information wie die Bot-Instanze
 */
module.exports.help = {
    apiVersion: 2,
    pluginType: "ADDON",
    name: "joinrole"
}