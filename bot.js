const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(`Your bot ${client.user.tag} is online!`);
});

client.on('message', message => {
  if (message.content === ``{
    msg.reply('Pong!');
  }
});

client.login('token');
