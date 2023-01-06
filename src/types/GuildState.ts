import { AudioPlayer, VoiceConnection } from "@discordjs/voice"
import { ImprovedArray } from "sussy-util"

declare type GuildState = {
    voice: VoiceConnection,
    playing: boolean,
    queue: ImprovedArray<string>,
    player: AudioPlayer
}

export default GuildState;