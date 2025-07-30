import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));
// Serve arquivos estáticos da pasta "dist"
app.use(express.static(path.join(__dirname, 'dist')));

// Configura pasta das views
app.set('views', path.join(__dirname, 'views'));



// Configura o motor de templates EJS
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.render('home'); // renderiza views/home.ejs
});

app.get('/login', (req, res) => {
    res.render('login'); // renderiza views/login.ejs
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
