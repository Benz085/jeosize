require('dotenv').config()

export const config = {
    POST: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
}