const {caseNumber} = require('../../util/caseNumber.js');
const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

    let checkticket = await db.fetch(`guildTickets_${message.guild.id}`);
    if(checkticket == null || checkticket == 0) {
      xtal.cmdErr(message, "Tickets are not Enabled!", 'ticket-remove');
      return;
    }
    let checkrole = await db.fetch(`guildTicketsRole_${message.guild.id}`);
    let checkedrole = message.guild.roles.get(checkrole);
    if(checkrole == null || !checkedrole) {
      xtal.cmdErr(message, "Ticket Role is not Configured!", 'ticket-remove');
      return;
    }
  
    if(!message.channel.name.startsWith('ticket-')) {

        const notTicket = new Discord.RichEmbed()
            .setColor(colors.red)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`:x: **This command can only be used within a ticket channel**`)

        return message.channel.send(notTicket);
    }

    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    
    if(!user) {

      const err1 = new Discord.RichEmbed()
      .setColor(colors.red)
      .setDescription(`:x: **Unknown user.** Please mention a valid user.`)
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTimestamp()
      .setFooter(xtal.user.username, xtal.user.avatarURL);
      return message.channel.send(err1);

    }

    try {
    message.channel.overwritePermissions(user, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
    });
      const added = new Discord.RichEmbed()
          .setColor(colors.cyan)
          .setDescription(`${user} has been removed.`)
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTimestamp()
          .setFooter(xtal.user.username, xtal.user.avatarURL);
          message.channel.send(added);

    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(colors.cyan)
    .setDescription(`**Action:** Ticket [Removed User]\n**Target:** ${user.user.tag}\n**Moderator:** ${message.author.tag}\n**Channel:** ${message.channel} | ${message.channel.name} | ${message.channel.id}`)
    .setFooter(`Case ${caseNum}`);

    modlog.send(modembed)
  } catch(error) {
    message.channel.send(`Error: `+ error);
}
message.delete();
  
};

exports.help = {
  name: "ticket-remove",
  aliases: ['tickets-remove', 't-remove']
};

exports.conf = {
  usage: "ticket-remove @user",
  aliases: "tickets-remove, t-remove",
  description: "Removes a User a from the Ticket.",
  category: "Tickets"
};