const { Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collection } = require('discord.js')
const { token, prefix  } = require('./ayarlar/config')
const client = new Client({ intents: 32767 })
const {Manager} = require('discord-autorole-badges')
const chalk = require('chalk')
const fs = require('fs')
const config = require(`./ayarlar/roller`)
client.on('ready', async () => {
    client.user.setPresence({ activities:[{ name: "</> Levian Code" }], status: "idle" })
})

client.on('messageCreate', async message => {
    try{
        let client = message.client
        if (message.author.bot) return
        if (message.channel.type == "DM") return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(' ')[0].slice(prefix.length)
        let params = message.content.split(' ').slice(1)
        let cmd
        if (client.commands.has(command)) {
            cmd = client.commands.get(command)
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command))
        }
        if (cmd) {
            cmd.run(client, message, params)
        }
    }catch(e){
        message.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
        ] })
        console.log(e)
    }
})

const log = message => {
    console.log(`${message}`)
}

client.aliases = new Collection()
client.commands = new Collection()
fs.readdir('./commands/', (err, files) => {
    if(!files) return console.log(chalk.bold.red(`Komutlar klasörü yok!`))
    if (err) console.error(err)
    log(chalk.bold.blue(`${files.length} komut yüklenecek.`))
    files.forEach(f => {
        let props = require(`./commands/${f}`)
        log(chalk.bold.gray(`Yüklenen komut: ${props.name}.`))
        client.commands.set(props.name, props)
        props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name)
        })
    })
})


client.login(token).then(() => console.log(chalk.bold.green("LC - Giriş başarılı"))).catch(e => {
    console.log(e)
    console.log(chalk.bold.red("LC - Giriş başarısız"))
    process.exit(1)
})

//karşılama
client.on("guildMemberAdd", (member) => {

message.channel.send(`
👋 **Hey!** selam ${member.user}, **WindCode** sunucumuza hoşgeldin.

🌎 Seni aramızda görmek çok güzel.

📚 Sunucuda sohbete başlamadan önce <#935635705907003402> kanalındaki kuralları okuyun. 
`)

const row = new MessageActionRow() 
.addComponents(
  new MessageButton() 

.setStyle('PRIMARY')

.setLabel('Karşıla!')
.setEmoji('935698971240849420')
.setCustomId(`hello`) 
  )
client.channels.cache.get('935638992521674792').send({embeds: [embed], components: [row]})

}) 

//kayıt karşılama
client.on("guildMemberAdd", member => {  
  const kanal = "935634742567661628";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = ' **__Bu Hesap Güvenilir Değil__** '
if (kurulus > 1296000000) kontrol = ' **__Bu Hesap Güvenilir Gözüküyor__** '
  moment.locale("tr");
  let windcode = client.channels.get(kanal);
windcode.send("**Hoşgeldin! " + member + " Seninle __\`" + member.guild.memberCount + "\`__ Kişiyiz \n\n  Sunucuya Kayıt Olmak İçin #kayıt-chat'a İsim Yaş Yazınız ! \n\n  Kayıt Sorumlusu Rolündeki yetkililer sizinle ilgilenicektir  \n\n  Hesabın Oluşturulma Tarihi:** " + moment(member.user.createdAt).format("YYYY **__DD MMMM dddd (hh:mm:ss)__**") +  "  \n\n"  + kontrol + " \n\n",  new Discord.Attachment("https://media.giphy.com/media/dayIK7bQLhb4BCFlHN/giphy.gif"
    )
  );
});

//rozet rol
let manager = new Manager(client, {
    DISCORD_EMPLOYEE: config.discordstaff,
    PARTNERED_SERVER_OWNER: config.discordpartner,
    HYPESQUAD_EVENTS: config.hypesquadevents,
    BUGHUNTER_LEVEL_1: config.bughunterlevel1,
    HOUSE_BRAVERY: config.hypesquadbravery,
    HOUSE_BRILLIANCE: config.hypesquadbrilliance,
    HOUSE_BALANCE: config.hypesquadbalance,
    EARLY_SUPPORTER: config.earlysupporter,
    BUGHUNTER_LEVEL_2: config.bughunterlevel2,
    EARLY_VERIFIED_BOT_DEVELOPER: config.botdeveloper,
    DISCORD_CERTIFIED_MODERATOR: config.discordmod,

})

client.on("guildMemberAdd", async (member) => {
    await manager.setRole(member);
});

//abone sistemş
	    client.on("message",message=>{
	  if(message.author.bot) return false;

  if(message.channel.id=="935645171528388648"){ 
  if(message.attachments.size < 1) return false;
  if(message.member.roles.cache.get("935684559083823155")) return false;
  let kod = "`" 
  
      message.react("935706133149143050"); // EMOJİ 1
      message.react("935706227864920105"); // EMOJİ 2
      message.react("935705961748922389"); // EMOJİ 3
    
      message.reply(`attığın ss eğer **son video** değilse, **like**, **yorum**, **abone** yoksa ${kod}abone rolün verilmez.${kod}\nYetkililerimiz en kısa sürede ilgilenecektir. Lütfen bekleyin.`)
      const filter = (reaction, user) => {
        return message.guild.members.cache.get(user.id).roles.cache.has("935684559083823155")&&!user.bot;
      };
   
      const collector = message.createReactionCollector(filter, {});
  
      collector.on('collect', (reaction, user) => {

        if(reaction.emoji.name=="abone_tik"){ // EMOJİ 1
		if(message.member.roles.cache.get("ABONE ROL ID")) return false;
          message.guild.member(message.author.id).roles.add("935640395071782973")
		  client.channels.cache.get("935704774706360380").send(`${message.author} isimli kullanıcıya ${kod}${user.tag}${kod} tarafından ${kod}ABONE${kod} rolü verildi.`); 
          
          
        }else if(reaction.emoji.name=="abone_red"){ // EMOJİ 2
          message.guild.member(message.author.id).roles.remove("935640395071782973")
		  client.channels.cache.get("935704774706360380").send(`${message.author} isimli kullanıcının ${kod}${user.tag}${kod} tarafından ${kod}ABONE${kod} rolü alındı.`); 
          
          
		}else if(reaction.emoji.name=="abone_uyari"){ // EMOJİ 3
		  client.channels.cache.get("935704774706360380").send(`${message.author} son video like yorum ve abone gerek.`);

      
        }
      });
    };
  });
