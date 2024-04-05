"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Potato = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
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
exports.Potato = (0, mongoose_1.model)("games", gameSchema);
