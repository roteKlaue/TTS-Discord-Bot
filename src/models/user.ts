import { model, Schema, Types } from "mongoose";

export default model("user", new Schema({
    _id: Types.ObjectId,
    userid: { type: String, required: true },
    language: { type: String, default: "en" }
}), "users");