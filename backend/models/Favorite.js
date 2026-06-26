import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipeId: {
        type: String
    }
});

export default mongoose.model("Favorite", favoriteSchema);