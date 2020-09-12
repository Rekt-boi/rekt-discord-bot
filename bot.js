const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('./config.json')

client.user.setActivity(`${config.bot.prefix}help', { type: 'STREAMING', url: "https://twitch.tv/Twitch" }) // You can change the "STREAMING" to anything else, for example, for the Playing Activity, change the "STREAMING" to "PLAYING" and for listening, change the "STREAMING" to "LISTENING"!
                                         
client.on('message', message => {


  const server = message.guild;


  if (message.content === `${config.bot.prefix}logcreate`) {

    message.channel.send(`Successfully Created the Server Logging channel for ${server.name}!`)
    server.channels.create(`server-logs`, { reason: `${server.name} Audit Logs Channel` })
  .then(console.log)
  .catch(console.error);


  }else if (message.content === `${config.bot.prefix}help`) {
    const embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(`${client.user.tag}`)
    // Set the color of the embed
    .setColor('BLUE')
    // Set the main content of the embed
    .setDescription(`Create Log Channel:\n${config.bot.prefix}logcreate\n\nThat's all you have to do to start logging this serve logs! Have Fun!, Join the support server at ${config.bot.supportserverlink} `);
  // Send the embed to the same channel as the message
  message.channel.send(embed);

  }
});

client.on('guildMemberAdd', member => {

  const auditlog = member.guild.channels.cache.find(ch => ch.name === 'server-logs');
  if (!auditlog) return
  
  auditlog.send(`Member Joined: ${member}\n\nMember ID: ${member.id}`);
});

client.on('guildMemberRemove', memberleave => {

  const auditlog = memberleave.guild.channels.cache.find(ch => ch.name === 'server-logs');
if (!auditlog) return
auditlog.send(`Member Left: ${memberleave}\nMember ID: ${memberleave.id}`)

});

client.on('channelCreate', newchannel => {

  const auditlog = newchannel.guild.channels.cache.find(ch => ch.name === 'server-logs');
  if (!auditlog) return 
auditlog.send(`A channel was created, Channel: ${newchannel}\n Channel ID: ${newchannel.id}\nChannel Creator: ${newchannel.author}`)

client.on('channelDelete', deletedchannel => {

  const auditlog = deletedchannel.guild.channels.cache.find(ch => ch.name === 'server-logs');
  if (!auditlog) return
  auditlog.send(`A channel got deleted, Deleted Channel: ${deletedchannel}\nDeleted Channel ID: ${deletedchannel.id}\nChannel Deleter: ${deletedchannel.author}`)

})

client.on('inviteCreate', newinvite => {

  const auditlog = newinvite.guild.channels.cache.find(ch => ch.name === 'server-logs');
if (!auditlog) return
auditlog.send(`A Invite was created, Invite: ${newinvite}\nInvite Code: ${newinvite.code}\nInvite Creator: ${newinvite.inviter}`)
})

client.on('messageDelete', deletedmessage => {
  const auditlog = deletedmessage.guild.channels.cache.find(ch => ch.name === 'server-logs');
  if (!auditlog) return
  auditlog.send(`A message was deleted, Message: ${deletedmessage}\nDe: ${deletedmessage.author}`)
})

client.on('roleCreate', newrole => {
  const auditlog = newrole.guild.channels.cache.find(ch => ch.name === 'server-logs');
  if (!auditlog) return
  auditlog.send(`A new role was created: `)

})

});

client.login(config.bot.token)
