import { CacheType, Client, CommandInteraction, Guild, GuildMember } from "discord.js";
import Command from "../types/Command";
import { guildStates } from "..";
import { createAudioPlayer, joinVoiceChannel, NoSubscriberBehavior } from "@discordjs/voice";
import { ImprovedArray } from "sussy-util";

export default {
    name: "join",
    description: "Join a channel",
    secret: true,

    run: (client: Client, interaction: CommandInteraction<CacheType>) => {
        const member = interaction.member as unknown as GuildMember;
        const guild = interaction.guild as Guild;

        if (!(member.voice.channel?.id)) return interaction.followUp("Please enter a voice channel before using this command.");
        if (guildStates.get(guild.id)?.voice) return interaction.followUp("I am already in a voice channel.");
        
        const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } })

        guildStates.set(guild.id, { voice: joinVoiceChannel({ channelId: member.voice.channel.id, guildId: guild.id, adapterCreator: guild.voiceAdapterCreator }), queue: new ImprovedArray<string>, playing: false, player: player });
        guildStates.get(guild.id)?.voice.subscribe(player);

        interaction.followUp({ content: `Joined ${member.voice.channel.toString()}!` });
    }
} as Command;