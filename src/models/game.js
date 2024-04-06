"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: Number,
    orders: [
        {
            description: String,
            amountInCents: Number
        }
    ]
});
const Potato = (0, mongoose_1.model)("game", gameSchema);
exports.default = Potato;
