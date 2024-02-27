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
exports.loginFacebook = exports.loginEmail = exports.loginGoogle = exports.game24 = exports.searchPlaces = exports.index = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const solveGame24_1 = require("../utils/solveGame24");
const app_1 = __importDefault(require("firebase/compat/app"));
const auth_1 = require("firebase/auth");
const firebaseConfig_1 = require("../firebaseConfig");
const jwt_1 = require("../service/jwt");
app_1.default.initializeApp(firebaseConfig_1.firebaseConfig);
/**
 * GET /api
 */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: "jenosize",
    });
});
exports.index = index;
const searchPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, pageToken } = req.query;
    if (!search) {
        return res.status(400).json({ message: "Query parameter is required." });
    }
    try {
        const params = {
            query: search,
            key: config_1.config.GOOGLE_PLACES_API_KEY,
        };
        if (pageToken) {
            params.pageToken = pageToken;
        }
        const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params,
        });
        return res.json(response.data);
    }
    catch (error) {
        console.error("Error searching for places:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.searchPlaces = searchPlaces;
/**
 * POST /api
 */
const game24 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const numbers = req.body.numbers;
    if (!numbers || numbers.length !== 4) {
        return res.status(400).json({ message: "Four numbers are required." });
    }
    const hasSolution = (0, solveGame24_1.solveGame24)(numbers);
    return res.status(200).json({ result: hasSolution ? "YES" : "NO" });
});
exports.game24 = game24;
const loginGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idToken } = req.body;
        if (!idToken || idToken === "" || idToken === null) {
            res.status(400).json({ message: "Validation idToken" });
        }
        const jwtToken = (0, jwt_1.generateJWT)(idToken);
        res.json({ apiKey: jwtToken });
    }
    catch (error) {
        console.error("Error logging in with Google:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginGoogle = loginGoogle;
const loginEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!req.body) {
            res.status(400).json({ message: "Validation body" });
        }
        if (!email || email === "" || email === null) {
            res.status(400).json({ message: "Validation email" });
        }
        if (!password || password === "" || password === null) {
            res.status(400).json({ message: "Validation password" });
        }
        const auth = (0, auth_1.getAuth)();
        const user = auth.currentUser;
        if (user === null) {
            const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
            if (userCredential.user) {
                res.status(200).json({
                    apiKey: (yield userCredential.user.getIdTokenResult()).token,
                });
            }
            res.status(200).json({ message: "not user" });
        }
        else {
            res.status(200).json({ apiKey: (yield user.getIdTokenResult()).token });
        }
    }
    catch (error) {
        console.error("Error logging in with Google:", error);
        if (error.user === undefined) {
            res.status(200).json({ message: "User undefined" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginEmail = loginEmail;
const loginFacebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken } = req.body;
        if (!accessToken || accessToken === "" || accessToken === null) {
            res.status(400).json({ message: "Validation accessToken" });
        }
        const jwtToken = (0, jwt_1.generateJWT)(accessToken);
        res.json({ apiKey: jwtToken });
    }
    catch (error) {
        console.error("Error logging in with Google:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginFacebook = loginFacebook;
//# sourceMappingURL=jenosize.controller.js.map