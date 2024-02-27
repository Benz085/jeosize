"use strict";
import axios from "axios";
import { Response, Request, NextFunction } from "express";
import { config } from "../config";
import { solveGame24 } from "../utils/solveGame24";
import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import { generateJWT } from "../service/jwt";
import { exit } from "process";

firebase.initializeApp(firebaseConfig);

/**
 * GET /api
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    data: "jenosize",
  });
};

export const searchPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search, pageToken } = req.query;
  if (!search) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  try {
    const params: any = {
      query: search,
      key: config.GOOGLE_PLACES_API_KEY,
    };
    if (pageToken) {
      params.pageToken = pageToken;
    }
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params,
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.error("Error searching for places:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * POST /api
 */
export const game24 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const numbers: number[] = req.body.numbers;
  if (!numbers || numbers.length !== 4) {
    return res.status(400).json({ message: "Four numbers are required." });
  }
  const hasSolution = solveGame24(numbers);
  return res.status(200).json({ result: hasSolution ? "YES" : "NO" });
};

export const loginGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body;
    if (!idToken || idToken === "" || idToken === null) {
      res.status(400).json({ message: "Validation idToken" });
    }
    const jwtToken = generateJWT(idToken);
    res.json({ apiKey: jwtToken });
  } catch (error) {
    console.error("Error logging in with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const jwtToken = generateJWT(uid);
      res.status(200).json({ apiKey: jwtToken });
    } else {
      const uid = await user.uid;
      const jwtToken = generateJWT(uid);
      res.status(200).json({ apiKey: jwtToken });
    }
  } catch (error: any) {
    console.error("Error logging in with Google:", error);
    if (error.user === undefined) {
      res.status(400).json({ message: "Sign-in failed", error: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginFacebook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken || accessToken === "" || accessToken === null) {
      res.status(400).json({ message: "Validation accessToken" });
    }
    const jwtToken = generateJWT(accessToken);
    res.json({ apiKey: jwtToken });
  } catch (error) {
    console.error("Error logging in with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
