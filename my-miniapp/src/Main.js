import { useState, useEffect } from "react";
import FirstLevel from "./FirstLevel";
import { Admin } from "./Admin";

export const Main = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [levels, setLevels] = useState([]); // Состояние для хранения уровней

  // Загрузка уровней при монтировании компонента
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch("https://your-subdomain.loca.lt/api/levels");
        console.log("Response:", response); // Логируем ответ
        if (!response.ok) {
          throw new Error("Ошибка при загрузке уровней");
        }
        const data = await response.json();
        setLevels(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchLevels();
  }, []);

  return (
    <>
      {currentScreen === "main" ? (
        <div style={styles.levels}>
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setCurrentScreen("first")} // Переход на уровень
              style={styles.level}
            >
              <h1 style={styles.levelTitle}>{level.name}</h1>
            </button>
          ))}
          <button onClick={() => setCurrentScreen("admin")}>admin</button>
        </div>
      ) : currentScreen === "admin" ? (
        <Admin />
      ) : (
        <FirstLevel />
      )}
    </>
  );
};

const styles = {
  levels: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    flexDirection: "column", // Чтобы кнопки были в колонку
  },
  level: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#6200ea",
    border: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    margin: "10px", // Добавляем отступ между кнопками
  },
  levelTitle: {
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
  },
};