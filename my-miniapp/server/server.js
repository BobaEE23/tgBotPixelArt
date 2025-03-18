require("dotenv").config();


const express = require("express");
const cors = require("cors"); // Импортируем cors
const { Pool } = require("pg");

const app = express();
app.use(cors()); // Разрешаем все CORS-запросы
app.use(express.json());
app.use(express.json({ limit: "50mb" })); // Увеличиваем лимит до 50 МБ
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("Ошибка подключения к базе данных:", err);
    } else {
      console.log("Подключение к базе данных успешно. Текущее время:", res.rows[0].now);
    }
  });


// Эндпоинт для добавления уровня
app.post("/api/levels", async (req, res) => {
  const { name, image, grid_size, cell_size, colors, pixel_colors } = req.body;

  try {
    const query = `
      INSERT INTO levels (name, image, grid_size, cell_size, colors, pixel_colors)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      name,
      image,
      grid_size,
      cell_size,
      JSON.stringify(colors),
      JSON.stringify(pixel_colors),
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при добавлении уровня:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
// Эндпоинт для получения всех уровней
app.get("/api/levels", async (req, res) => {
  try {
    const query = "SELECT * FROM levels;";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении уровней:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

});