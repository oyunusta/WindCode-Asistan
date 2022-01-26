const Discord = require('discord.js')

module.exports = {
    name: "kayıt",
    aliases: [ "k", “ky” ],
    async run(client, message, args){


if(!message.member.roles.has('935633999764795402')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "935602416865411172"; ///alınacak rol idsi
  let ver = "935601634246029383"; ///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`${isim} • [${yaş}]`);
  
    member.addRole(ver);
    member.removeRole(al);
  

  const windcodelog = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Kayıt Sistemi")
    .setThumbnail(message.author.avatarURL)
    .setDescription( `Kayıt Edilen Kullanıcı : **${member.user}** \n Kayıt Eden Yetkili : ${message.author.username} \n Kayıt Islemınde Verılen Rol : <@&${ver}> \n Alınan Rol : <@&${al}>`)
client.channels.get('935634742567661628').send({embeds: [windcodelog]})
};

}
}
