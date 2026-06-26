import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorites
} from "../controllers/favoriteController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, addFavorite);

router.get("/", protect, getFavorites);

router.delete("/:id", protect, removeFavorite);

export default router;