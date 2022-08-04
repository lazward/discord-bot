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
    
            console.error(error) ;
            interaction.reply({content: 'Error running command', ephemeral: true}) ;
    
        }
        
    },

} ;