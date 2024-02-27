"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('dotenv').config();
exports.config = {
    POST: process.env.PORT,
    BASE_URL: process.env.DOMAIN_URL,
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
};
//# sourceMappingURL=config.js.map