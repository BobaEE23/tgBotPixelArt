import { useState } from "react";

const FirstLevel = ({ level }) => {
  // Инициализируем пустую сетку
  const initialPixelColors = Array.from({ length: level.grid_size * level.grid_size }).reduce((acc, _, index) => {
    acc[index] = "transparent"; // Изначально все пиксели прозрачные
    return acc;
  }, {});

  const [pixelColors, setPixelColors] = useState(initialPixelColors); // Состояние цветов пикселей
  const [isLevelCompleted, setIsLevelCompleted] = useState(false); // Состояние завершенности уровня
  const [selectedColor, setSelectedColor] = useState(""); // Выбранный цвет

  // Обработчик клика по пикселю
  const handlePixelClick = (index) => {
    if (selectedColor) {
      setPixelColors((prevColors) => ({
        ...prevColors,
        [index]: selectedColor, // Закрашиваем пиксель выбранным цветом
      }));
    }
  };

  // Проверка завершенности уровня
  const checkLevelCompletion = () => {
    // Сравниваем массив цветов пользователя с массивом из базы данных
    const isCompleted = Object.keys(level.pixel_colors).every(
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
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.4,
      zIndex: 0,
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
      zIndex: 1,
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
    colorPicker: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    colorButton: {
      padding: "10px",
      border: "2px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <h1 style={styles.headerTitle}>Уровень: {level.name}</h1>

      {/* Выбор цвета */}
      <div style={styles.colorPicker}>
        {level.colors.map((color, index) => (
          <div
            key={index}
            style={{
              ...styles.colorButton,
              backgroundColor: color,
              border: selectedColor === color ? "2px solid #000" : "2px solid #ccc",
            }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>

      {/* Сетка с фоновым изображением */}
      <div style={styles.gridWrapper}>
        {level.image && (
          <div
            style={{
              ...styles.backgroundImage,
              backgroundImage: `url(${level.image})`,
            }}
          ></div>
        )}

        {/* Сетка пикселей */}
        <div style={styles.grid}>
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.pixel,
                backgroundColor: pixelColors[index] || "transparent",
              }}
              onClick={() => handlePixelClick(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Кнопка проверки */}
      <button style={styles.checkButton} onClick={checkLevelCompletion}>
        Проверить рисунок
      </button>

      {/* Сообщение о завершении уровня */}
      {isLevelCompleted && (
        <div style={styles.message}>Вы решили уровень!</div>
      )}
    </div>
  );
};

export default FirstLevel;