const fs = require('node:fs') ;
const path = require('node:path') ;
const {Routes} = require('discord.js') ;
const {REST} = require('@discordjs/rest') ;
const {clientID, guildID, token} = require('./config.json') ;

const commands = [] ;
const cmdPath = path.join(__dirname, 'commands') ;
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js')) ;

for (const file of cmdFiles) {

    const filePath = path.join(cmdPath, file) ;
    const cmd = require(filePath) ;
    commands.push(cmd.data.toJSON()) ;

}