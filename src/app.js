"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const game_1 = __importDefault(require("./models/game"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
if (!CONNECTION) {
    console.error("MongoDB connection string not provided.");
    process.exit(1);
}
app.get("/", (req, res) => {
    res.send("Home Page!");
});
app.get("/api/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield game_1.default.find();
        res.json({ games: result });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
app.get("/api/games/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({
        requestParams: req.params,
        requestQuery: req.query,
    });
    const gameId = req.params.id;
    try {
        const g = yield game_1.default.findById(gameId);
        if (!g) {
            res.status(404).json({ error: "Game not found" });
        }
        else {
            res.json({ game: g });
        }
    }
    catch (err) {
        res.status(404).json({ error: "Something wrong in the server" });
    }
}));
app.get("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        const result = yield game_1.default.findOne({ "orders._id": orderId });
        if (result) {
            res.json(result.orders);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (err) {
        res
            .status(404)
            .json({ error: "There was an internal problem, please try again later" });
    }
}));
app.put("/api/games/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    try {
        const game = yield game_1.default.findOneAndReplace({ _id: gameId }, req.body, {
            new: true,
        });
        console.log(game);
        res.json({ game });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong, try again later" });
    }
}));
app.patch("/api/games/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const game = yield game_1.default.findOneAndUpdate({ _id: gameId }, req.body, {
            new: true,
        });
        console.log(game);
        res.json({ game });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong to PATCH" });
    }
}));
app.patch("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const orderId = req.params.id;
    req.body._id = orderId;
    try {
        const result = yield game_1.default.findOneAndUpdate({ "orders._id": orderId }, { $set: { "orders.$": req.body } }, { new: true });
        console.log(result);
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json({ error: "Somethign went wrong" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}));
app.delete("/api/games/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameId = req.params.id;
        const result = yield game_1.default.deleteOne({ _id: gameId });
        res.json({ deletedCount: result.deletedCount });
    }
    catch (err) {
        res.status(500).json({
            error: "Error to delete. Something went wrong, try again later",
        });
    }
}));
app.post("/api/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const game = new game_1.default(req.body);
    try {
        yield game.save();
        res.status(201).json({ game });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}));
app.post("/", (req, res) => {
    res.send("This is a post request");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(CONNECTION);
        app.listen(PORT, () => {
            console.log("App listening on port " + PORT);
        });
    }
    catch (e) {
        console.log(e.message);
    }
});
start();
