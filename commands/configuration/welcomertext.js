const db = require('quick.db');
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors, emojis) => {

const defaulttxt = "**{{user}}**, Welcome to **{{server}}**";

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
    if(args[0] && args[0].toLowerCase() == "reset") {

    let dbchannel = await db.fetch(`guildWelcome_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Welcomer Channel is not yet Set!`);

        await db.set(`guildWelcomeMessage_${message.guild.id}`, defaulttxt);
        message.channel.send(`Welcomer Message has been set to **Default**.`);
        return;

    } else if(args[0] && args[0].toLowerCase() == "help") {

const description = `
{{user}} - User Tag [${message.author.tag}]
{{mentionuser}} - @User [${message.author}]
{{server}} - Server Name [${message.guild.name}]
{{memcount}} - Server Member Count [${message.guild.memberCount}]
`; //End

        let embed = new RichEmbed()
        .setAuthor(`Welcomer Help`, message.guild.iconURL)
        .setTimestamp()
        .setColor(colors.cyan)
        .setDescription(description)
        .addField(`Default Text`, defaulttxt)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        message.channel.send({embed});
        return;

    } else {

    let dbchannel = await db.fetch(`guildWelcome_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Welcomer Channel is not yet Set!`);

    let welcomerargs = args.join(" ");
    let weltext = await db.fetch(`guildWelcomeMessage_${message.guild.id}`);
    if(weltext == null || weltext == 'Default.') { weltext = defaulttxt };
    if(!welcomerargs) return message.channel.send(`Welcomer Message on this guild is \`${weltext}\``);
    await db.set(`guildWelcomeMessage_${message.guild.id}`, welcomerargs);
    message.channel.send(`Welcomer Message has been changed to \`` + welcomerargs + `\``);
    
}
};

exports.help = {
  name: "welcomertext",
  aliases: ['welcomermessage', 'welcomemessage', 'welcometext']
};

exports.conf = {
  usage: "welcomertext **or** welcomer [text/reset/help]",
  aliases: "welcomermessage, welcomemessage, welcometext",
  description: "Shows/Sets the Welcomer Message.",
  category: "Configuration"
};