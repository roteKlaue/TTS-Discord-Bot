import { connect, set } from 'mongoose';
import { Client, GatewayIntentBits, Events, Collection, Message } from 'discord.js';
import "dotenv/config";
import ready from "./events/ready";
import interaction from "./events/interactionCreate";
import message from "./events/messageCreate";
import { commands } from './handlers';
import Command from './types/Command';
import GuildState from './types/GuildState';
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

const command = new Collection<string, Command>();

const guildStates = new Collection<string, GuildState>();

commands(command);

client.once(Events.ClientReady, ready.bind(null, client, command));
client.on(Events.InteractionCreate, (interactions) => { interaction(client, command, interactions) });
client.on(Events.MessageCreate, (msg: Message<boolean>) => { message(client, msg) });

client.login(process.env.TOKEN);
connect(process.env.MONGO || "");

export {
    command,
    guildStates
}