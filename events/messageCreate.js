module.exports = {

    name: 'messageCreate',
    execute(message) {

        const content = message.content.toLowerCase().replace(/\s/g, '') ;

        if (content.includes("johnsmith") || content.includes("horse")) {

            message.react('🐴')
              .then(() => message.react('🐎'))
              .catch(() => console.error('couldnt horse react :,('));
        
        } else if (content.includes("goodbot")) {

            try {

                message.react('328583701321744396');

            } catch (error) {

                console.error('couldnt thank:\n' + error.stack) ;

            }

        }

    },

} ;