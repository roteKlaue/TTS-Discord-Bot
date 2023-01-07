import { Client, GatewayIntentBits, Events, Collection, Message } from 'discord.js';
import interaction from "./events/interactionCreate";
import { commands, selectmenus } from './handlers';
import message from "./events/messageCreate";
import GuildState from './types/GuildState';
import { connect, set } from 'mongoose';
import Command from './types/Command';
import ready from "./events/ready";
import "dotenv/config";
set('strictQuery', true);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

const guildStates = new Collection<string, GuildState>();
const selectMenus = new Collection<string, Function>();
const command = new Collection<string, Command>();

commands(command);
selectmenus(selectMenus);

client.once(Events.ClientReady, ready.bind(null, client, command));
client.on(Events.InteractionCreate, (interactions) => { interaction(client, interactions) });
client.on(Events.MessageCreate, (msg: Message<boolean>) => { message(client, msg) });

client.login(process.env.TOKEN);
connect(process.env.MONGO || "");

export {
    command,
    selectMenus,
    guildStates
}