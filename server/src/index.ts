import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

//endpoints
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
