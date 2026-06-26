import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/favorites", favoriteRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

