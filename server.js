require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = '!nn';

client.once('ready', () => {
  console.log("Bot Ready")
})

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  runNicketyName(message);
})

function runNicketyName(message){
  const user = message.mentions.users.first();
  const member = message.guild.member(user);

  var usernames = message.content.slice(prefix.length).split(" ")[1]
  var newNickname = message.content.slice(prefix.length + usernames.length + 2)
  if (member){
    if (message.member.id === member.id) {
      message.reply("you cant change your own nickname")
    }else{
      member.setNickname(newNickname).then(() => {message.channel.send(`${newNickname} you are new and improved, congrats`)}).catch(err =>
          message.reply(`Err: ${err}`))
    }
  }else {
    // The mentioned user isn't in this guild
    message.reply("That user isn't in this guild!");
  }
}

client.login(process.env.CLIENT_ID);
