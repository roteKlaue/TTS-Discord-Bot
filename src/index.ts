import { connect, set } from 'mongoose';
import { Client, GatewayIntentBits, Events, Collection } from 'discord.js';
import "dotenv/config";
import ready from "./events/ready";
import interaction from "./events/interactionCreate";
import message from "./events/messageCreate";
import { commands } from './handlers';
import Command from './types/Command';
import { VoiceConnection } from '@discordjs/voice';
import { ImprovedArray } from 'sussy-util';
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
const channels = new Collection<string, VoiceConnection>();
const queues = new Collection<string, ImprovedArray<string>>();

const guildStates = new Collection<string, GuildState>();

commands(command);

client.once(Events.ClientReady, ready.bind(null, client, command));
client.on(Events.InteractionCreate, (interactions) => {
    interaction(client, command, interactions)
});
client.on(Events.MessageCreate, message.bind(null, client));

client.login(process.env.TOKEN);
connect(process.env.MONGO || "");

export {
    channels,
    command,
    queues,
    guildStates
}