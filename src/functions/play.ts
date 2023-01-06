import { AudioPlayerStatus, createAudioResource } from "@discordjs/voice";
import GuildState from "../types/GuildState";

const play = async (url: string, state: GuildState, guildId: string) => {
    state.playing = true;
    const audioResource = createAudioResource(url);

    state.player.once(AudioPlayerStatus.Idle, () => {
        const next = state.queue.shift();
        if (!next) {
            state.playing = false;
            return;
        }
    
        play(next, state, guildId);
    });

    state.player.play(audioResource);
}

export default play;