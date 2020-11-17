require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
var log4js = require('log4js');
log4js.configure({
  appenders: {
    fileLog: { type: 'file', filename: './logs/ExecutionLog.log' },
    console: { type: 'log4js-protractor-appender' }
    },
    categories: {
    file: { appenders: ['fileLog'], level: 'error' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'fileLog'], level: 'trace' }
    }
});

var logger = log4js.getLogger('console')

const prefix = '!nn';

client.once('ready', () => {
  console.log("Bot Ready")
  logger.info(`Server Started Successfully`);
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
      logger.warn(`author: ${message.author.username} Attempt to change own name`);
    }else{
      member.setNickname(newNickname).then(() => {
        message.channel.send(`${newNickname} you are new and improved, congrats`)
        logger.info(`author: ${message.author.username} user: ${user.username} Successful nickname change new nickname: ${newNickname}`);
      }).catch(err => {
        message.reply(`Err: ${err}`)
        logger.warn(`Err: ${err}`);
      })
    }
  }else {
    // The mentioned user isn't in this guild
    message.reply("That user isn't in this guild!");
    logger.warn(`author: ${message.author.username} user: ${user.username} That user isn't in this guild!`);
  }
}

client.login(process.env.CLIENT_ID);
