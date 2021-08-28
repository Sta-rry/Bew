exports.run = async (xtal, message, args, colors, emojis) => {
  
  let construct = {
    words_words: [],
    words_channels: [],
    words_roles: [],
    words_toggle: false,
    
    message_time: 1,
    message_count: 2,
    message_channels: [],
    message_roles: [],
    message_action: null,
    message_toggle: false,
    
    domains_wrds: [],
    domains_channels: [],
    domains_roles: [],
    domains_toggle: false,
    
    emoji_channels: [],
    emoji_roles: [],
    emoji_toggle: false,
    
    mention_channels: [],
    mention_roles: [],
    mention_toggle: false,
    
    invite_channels: [],
    invite_roles: [],
    invite_toggle: false
  };
  
  xtal.automod.ensure(`${message.guild.id}`, construct);
  
  try {
  let automodsettings = xtal.automod.get(`${message.guild.id}`);
  if(!args.join(" ")) {
    return xtal.cmdErr(message, 'Provide Blacklist Words', this.help.name);
  } else if(!args.join(" ").length > 100) {
    return xtal.cmdErr(message, 'Blacklist Words Too Long', this.help.name);
  } else {
    let blacklisted = [];
    args.join(" ").split(",").forEach(x => {
      automodsettings.words_words.push(x);
      blacklisted.push(x);
    });
    xtal.automod.set(`${message.guild.id}`, automodsettings);
    xtal.simpleEmbed(message, `Words Blacklisted: **${blacklisted.join(", ")}**`)
  }
  } catch (e) {
    return xtal.cmdErr(message, e, this.help.name);
  }
  
};

exports.help = {
  name: "addblacklistword",
  aliases: ['addbword', 'addblacklistwords']
};

exports.conf = {
  usage: "addblacklistword [text]",
  examples: ["beach, fook", "kock"],
  guildOnly: true,
  memberPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD", "MANAGE_MESSAGES"],
  description: "Adds Words to Blacklist Words.",
  category: "AutoMod"
};