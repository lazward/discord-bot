const { EmbedBuilder } = require('discord.js');
const {logID} = require('../config.json') ;

module.exports = {

    name: 'messageDelete',
    execute(message) {

        if (message) {
        
            try {
        
                let user = message.author;
                let content = "<message was empty>" ;
                let attach = 'false' ;

                if (message.content) {

                    content = message.content ;

                }

                if (message.attachments.size > 0) {

                    attach = 'true' ;

                }

                let embed = new EmbedBuilder()
                    .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
                    .setDescription(message.member.toString() + " deleted in channel " + message.guild.channels.cache.get(message.channelId).toString())
                    .addFields(
                        { name: 'Message', value: content},
                        { name: 'Time created', value: new Date(message.createdTimestamp).toString()},
                        { name: 'Attachment(s)', value: attach}
                    )
                    .setTimestamp()
                    .setFooter({text: 'ID: ' + message.id}) ;
        
                message.guild.channels.cache.get(logID).send({embeds: [embed]});

                console.log("Logged deleted message") ;

            } catch(error) {

                console.error("Failed to log a deleted message:\n" + error.stack) ;

            }
        
        }

    },

} ;