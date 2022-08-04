const { EmbedBuilder } = require('discord.js');
const {logID} = require('../config.json') ;

module.exports = {

    name: 'messageUpdate',
    execute(oldMessage, newMessage) {

            let oldContent = newContent = "<message was empty>" ;
            let attach = 'false' ;

            if (oldMessage.content) {

                oldContent = oldMessage.content ;

            }

            if (newMessage.content) {

                newContent = newMessage.content ;

            }

            if (oldContent != newContent) {

                if (newMessage.attachments.size > 0) {

                    attach = 'true' ;

                }

                try {

                    let user = oldMessage.author ;
                    
                    let embed = new EmbedBuilder()
                    .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
                    .setDescription(oldMessage.member.toString() + " edited a message in channel " + oldMessage.guild.channels.cache.get(oldMessage.channelId).toString())
                    .addFields(
                        { name: 'Old Message', value: oldContent},
                        { name: 'New Message', value: newContent},
                        { name: 'Time created', value: new Date(oldMessage.createdTimestamp).toString()},
                        { name: 'Attachment(s)', value: attach}
                    )
                    .setTimestamp()
                    .setFooter({text: 'ID: ' + newMessage.id}) ;
        
                    newMessage.guild.channels.cache.get(logID).send({embeds: [embed]});

                    console.log("Logged updated message") ;

                } catch(error) {
    
                    console.error("Failed to log an updated message:\n", error.stack) ;
    
                }

            }


    }

} ;