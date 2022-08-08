const { EmbedBuilder } = require('discord.js');
const {logID} = require('../config.json') ;

module.exports = {

    name: 'voiceStateUpdate',
    execute(oldState, newState) {

        if (oldState.channel != newState.channel) {

            if (oldState.channel == null) { // Joined vc

                let user = oldState.member.user ;

                let embed = new EmbedBuilder()
                .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
                .setDescription(oldState.member.toString() + " has joined voice channel " + newState.channel.toString())
                .setTimestamp() ;

                oldState.guild.channels.cache.get(logID).send({embeds: [embed]});

                console.log("Logged user joining vc") ;
            
            } else if (newState.channel == null) { // Left vc

                let user = oldState.member.user ;

                let embed = new EmbedBuilder()
                .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
                .setDescription(oldState.member.toString() + " has left voice channel " + oldState.channel.toString())
                .setTimestamp() ;

                oldState.guild.channels.cache.get(logID).send({embeds: [embed]});

                console.log("Logged user leaving vc") ;

            } else { // Moved vc

                let user = oldState.member.user ;

                let embed = new EmbedBuilder()
                .setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
                .setDescription(oldState.member.toString() + " has moved from " + oldState.channel.toString() + " to " + newState.channel.toString())
                .setTimestamp() ;

                oldState.guild.channels.cache.get(logID).send({embeds: [embed]});

                console.log("Logged user moving vc") ;

            }

    }

    },

} ;