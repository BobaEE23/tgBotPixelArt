import { useState } from "react";

const FirstLevel = ({ level }) => {
 

  const [pixelColors, setPixelColors] = useState(level.pixel_colors || {});
  const [isLevelCompleted, setIsLevelCompleted] = useState(false); // Для проверки завершенности уровня

  const handlePixelClick = (index) => {
    const newColor = "#FF0000"; // Например, красный цвет. Это можно изменить.
    setPixelColors((prevColors) => ({
      ...prevColors,
      [index]: newColor,
    }));
  };

  const checkLevelCompletion = () => {
    // Сравниваем массив цветов пользователя с тем, что в базе данных
    const isCompleted = Object.keys(pixelColors).every(
      (index) => pixelColors[index] === level.pixel_colors[index]
    );

    if (isCompleted) {
      setIsLevelCompleted(true);
    } else {
      setIsLevelCompleted(false);
    }
  };

  const CELL_SIZE = level.cell_size;
  const gridSize = level.grid_size;
  const FIELD_WIDTH = gridSize * CELL_SIZE;
  const FIELD_HEIGHT = gridSize * CELL_SIZE;

  const styles = {
    gridWrapper: {
      position: "relative",
      width: `${FIELD_WIDTH}px`,
      height: `${FIELD_HEIGHT}px`,
      border: "2px solid black",
      marginTop: "20px",
      overflow: "hidden",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${CELL_SIZE}px)`,
      width: `${FIELD_WIDTH}px`,
      height: `${FIELD_HEIGHT}px`,
      position: "absolute",
      top: 0,
      left: 0,
    },
    pixel: {
      width: `${CELL_SIZE}px`,
      height: `${CELL_SIZE}px`,
      border: "0.1px solid rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
      cursor: "pointer",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    checkButton: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#28a745",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    message: {
      marginTop: "20px",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#28a745",
    },
  };

  return (
    <div>
      <h1 style={styles.headerTitle}>Уровень: {level.name}</h1>

      <div style={styles.gridWrapper}>
        <div style={styles.grid}>
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.pixel,
                backgroundColor: pixelColors[index] || "transparent",
              }}
              onClick={() => handlePixelClick(index)} // Обработчик клика для пикселя
            ></div>
          ))}
        </div>
      </div>

      <button style={styles.checkButton} onClick={checkLevelCompletion}>
        Проверить рисунок
      </button>

      {isLevelCompleted && (
        <div style={styles.message}>Вы решили уровень!</div>
      )}
    </div>
  );
};

export default FirstLevel;
