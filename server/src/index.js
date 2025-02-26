import express from 'express';
import cors from 'cors';
import skillsRoutes from './routes/skills.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/skills', skillsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
