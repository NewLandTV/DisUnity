// Require
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token, channelId } = require("./config.json");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    client.user.setActivity("Discord + Unity", { type: "PLAYING" });

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        // Slash command execute
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
});

module.exports = {
    SendMessage(msg) {
        client.channels.cache.get(channelId).send(msg);
    }
};

client.login(token);

require("./server.js").KeepAlive();