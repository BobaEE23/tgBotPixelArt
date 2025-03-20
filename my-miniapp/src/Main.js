import { useState, useEffect } from "react";
import FirstLevel from "./FirstLevel";
import { Admin } from "./Admin";

export const Main = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch("https://tgbotpixelart.onrender.com/api/levels");
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

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setCurrentScreen("first");
  };

  return (
    <div style={styles.mainContainer}>
      {currentScreen === "main" ? (
        <div style={styles.levelsContainer}>
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleLevelClick(level)}
              style={styles.levelButton}
            >
              <h1 style={styles.levelTitle}>{level.id}</h1>
            </button>
          ))}
          <button onClick={() => setCurrentScreen("admin")} style={styles.adminButton}>admin</button>
        </div>
      ) : currentScreen === "admin" ? (
        <Admin />
      ) : (
        <FirstLevel level={selectedLevel} />
      )}
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  levelsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  levelButton: {
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
  },
  levelButtonHover: {
    transform: "scale(1.1)",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
  },
  levelTitle: {
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
  },
  adminButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#ff1744",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  adminButtonHover: {
    backgroundColor: "#d50000",
  },
};
