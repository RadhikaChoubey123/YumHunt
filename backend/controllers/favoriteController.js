import Favorite from "../models/Favorite.js";

// ADD FAVORITE
export const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;

        const fav = await Favorite.create({
            userId: req.user.id,
            recipeId
        });

        res.json(fav);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET FAVORITES
export const getFavorites = async (req, res) => {
    try {
        const favs = await Favorite.find({ userId: req.user.id });
        res.json(favs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// REMOVE FAVORITE
export const removeFavorite = async (req, res) => {
    try {
        await Favorite.findOneAndDelete({
            userId: req.user.id,
            recipeId: req.params.id
        });

        res.json({ message: "Removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

