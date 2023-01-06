import { model, Schema, Types } from "mongoose";

export default model("guild", new Schema({
    _id: Types.ObjectId,
    guildId: { type: String, required: true },
    tts_channel: { type: String, required: false }
}), "guilds");