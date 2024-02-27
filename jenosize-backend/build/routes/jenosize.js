"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jenosizeRouter = void 0;
const express_1 = __importDefault(require("express"));
const JenosizeController = __importStar(require("../controller/jenosize.controller"));
const passportJWT_1 = __importDefault(require("../middleware/passportJWT"));
exports.jenosizeRouter = express_1.default.Router();
/* GET users listing. */
exports.jenosizeRouter.get("/", passportJWT_1.default.authenticate("jwt", { session: false }), JenosizeController.index);
exports.jenosizeRouter.get("/searchPlaces", passportJWT_1.default.authenticate("jwt", { session: false }), JenosizeController.searchPlaces);
exports.jenosizeRouter.post("/game24", passportJWT_1.default.authenticate("jwt", { session: false }), JenosizeController.game24);
exports.jenosizeRouter.post("/login/google", JenosizeController.loginGoogle);
exports.jenosizeRouter.post("/login/email", JenosizeController.loginEmail);
exports.jenosizeRouter.post("/login/facebook", JenosizeController.loginFacebook);
//# sourceMappingURL=jenosize.js.map