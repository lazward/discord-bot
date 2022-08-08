const { EmbedBuilder } = require('discord.js');
const {logID} = require('../config.json') ;

module.exports = {

    name: 'guildMemberRemove',
    execute(GuildMember) {

        try {

            let user = GuildMember.user ;

            let embed = new EmbedBuilder()
            .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
            .setDescription(GuildMember.toString() + " has left the server")
            .setTimestamp() ;

            message.guild.channels.cache.get(logID).send({embeds: [embed]});

            console.log("Logged user leave") ;

        } catch(error) {

            console.error("Failed to log user leaving server:\n" + error.stack) ;

        }

    },

} ;