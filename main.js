const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-";
const fs = require("fs");
const Moderatore = require("./functions/Moderatore.js");
const embed = require("./functions/sendEmbed.js");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

var mods = new Map();

client.once("ready", () => {
  console.log("bot is online\n");

  client.user.setActivity("-help", { type: 2 });

  client.guilds.cache.each((guild) => {
    mods.set(guild.id, [new Moderatore(), true]);
  });
});

client.on("guildCreate", (guild) => {
  mods.set(guild.id, [new Moderatore(), true]);
});

client.on("guildDelete", (guild) => {
  mods.delete(guild.id);
});

client.on("message", (message) => {
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command.valueOf() === "mode") {
    client.commands.get(command).execute(message, args, mods);
    return;
  }

  if (command.valueOf() === "next" && mods.get(message.guild.id)[1]) {
    embed.sendEmbed(
      [255, 0, 0],
      "Non puoi eseguire `-next` con la modalità auto",
      message.channel
    );
    return;
  }

  if (client.commands.has(command))
    client.commands
      .get(command)
      .execute(
        message,
        args,
        mods.get(message.guild.id)[0],
        mods.get(message.guild.id)[1],
        client
      );
});

client.login(process.env.DJS_TOKEN);
