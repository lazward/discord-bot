module.exports = {

    name: 'interactionCreate',
    execute(interaction, client) {

        console.log(`Interaction triggered by ${interaction.user.tag} in channel #${interaction.channel.name}`) ;

        if (!interaction.isChatInputCommand()) return ;
    
        const command = client.commands.get(interaction.commandName) ;
    
        if (!command) return ;
    
        try {
    
            command.execute(interaction) ;
    
        } catch (error) {
    
            console.error("Error running command:\n" + error.stack) ;
            interaction.reply({content: 'Error running command', ephemeral: true}) ;
    
        }
        
    },

} ;