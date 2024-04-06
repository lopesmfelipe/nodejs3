"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    releaseDate: Number,
    orders: [
        {
            description: String,
            amountInCents: Number,
        },
    ],
});
const Potato = (0, mongoose_1.model)("game", gameSchema);
const g = new Potato({
    name: "Outlast 2",
    releaseDate: 2013,
});
console.log(g.n());
exports.default = Potato;
