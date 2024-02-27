"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
// import cookieParser from "cookie-parser";
// Router
const jenosize_1 = require("./routes/jenosize");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '50mb' })); // / Set POST From JSON
app.use(express_1.default.urlencoded({ extended: false })); // Set POST DATA From Action
// app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
// Route
app.use("/api/jenosize", jenosize_1.jenosizeRouter);
exports.default = app;
//# sourceMappingURL=app.js.map