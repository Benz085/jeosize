import express from "express";
import path from "path";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";


// Router
import { jenosizeRouter } from "./routes/jenosize";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '50mb' })); // / Set POST From JSON
app.use(express.urlencoded({ extended: false })); // Set POST DATA From Action

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// Route
app.use("/api/jenosize", jenosizeRouter);


export default app;