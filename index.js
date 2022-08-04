const fs = require('node:fs') ;
const path = require('node:path') ;
const {Client, Collection, IntentsBitField} = require('discord.js') ;
const {token} = require('./config.json') ;

const intents = new IntentsBitField() ;
intents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent) ;

const client = new Client({intents: intents}) ;

client.commands = new Collection() ;
const cmdPath = path.join(__dirname, 'commands') ;
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js')) ;

for (const file of cmdFiles) {
    
    const filePath = path.join(cmdPath, file) ;
    const cmd = require(filePath) ;
    client.commands.set(cmd.data.name, cmd) ;
    console.log('Loaded command ' + cmd.data.name) ;

}

const eventsPath = path.join(__dirname, 'events') ;
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')) ;

for (const file of eventFiles) {

    const filePath = path.join(eventsPath, file) ;
    const event = require(filePath) ;

    if (event.once) {

        client.once(event.name, (...args) => event.execute(...args, client)) ;

    } else {
        
        client.on(event.name, (...args) => event.execute(...args, client)) ;

    }

    console.log('Loaded event ' + event.name) ;

}

client.login(token) ;