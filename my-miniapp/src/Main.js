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
        <>
          <h1 style={styles.mainTitle}>Pixel Art Game</h1>
          <div style={styles.levelsContainer}>
            <div style={styles.levelsGrid}>
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelClick(level)}
                  style={styles.levelButton}
                >
                  <span style={styles.levelTitle}>{level.id}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentScreen("admin")} 
              style={styles.adminButton}
            >
              Admin Panel
            </button>
          </div>
        </>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    backgroundAttachment: "fixed",
  },
  mainTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#3a4a6b",
    margin: "20px 0",
    textAlign: "center",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
  levelsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "800px",
  },
  levelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    width: "100%",
    marginBottom: "30px",
    justifyContent: "center",
  },
  levelButton: {
    width: "100%",
    aspectRatio: "1/1",
    maxWidth: "120px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    border: "none",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  levelButtonHover: {
    transform: "scale(1.05)",
    boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.8)",
  },
  levelTitle: {
    color: "#3a4a6b",
    fontSize: "2rem",
    fontWeight: "bold",
    zIndex: 1,
  },
  adminButton: {
    padding: "12px 25px",
    fontSize: "1rem",
    fontWeight: "600",
    background: "linear-gradient(135deg, #ff5e62 0%, #ff9966 100%)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 105, 105, 0.3)",
    marginTop: "20px",
  },
  adminButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 105, 105, 0.4)",
  },
};