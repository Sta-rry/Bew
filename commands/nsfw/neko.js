const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!message.channel.nsfw) {return message.channel.send(`❌ It is not a NSFW Channel!`)}
    else {
    let image = await memer.neko()
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Anime NSFW`, message.author.avatarURL)
    .setTimestamp()
    .setImage(image)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
    };
  
};

exports.help = {
  name: "neko",
  aliases: []
};

exports.conf = {
  usage: "neko",
  aliases: "None.",
  description: "Neko Image.",
  category: "NSFW"
};