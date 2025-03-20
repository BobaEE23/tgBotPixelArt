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
    const isCompleted = Object.keys(level.pixel_colors).every(
      (index) => pixelColors[index] === level.pixel_colors[index]
    );

    setIsLevelCompleted(isCompleted);
  };

  const CELL_SIZE = level.cell_size;
  const gridSize = level.grid_size;
  const FIELD_WIDTH = gridSize * CELL_SIZE;
  const FIELD_HEIGHT = gridSize * CELL_SIZE;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "20px",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    colorPicker: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    colorButton: {
      width: "40px",
      height: "40px",
      borderRadius: "5px",
      border: "2px solid #ccc",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    colorButtonSelected: {
      transform: "scale(1.1)",
      border: "2px solid black",
    },
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
    checkButton: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#28a745",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    checkButtonHover: {
      backgroundColor: "#218838",
    },
    message: {
      marginTop: "20px",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#28a745",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerTitle}>Уровень: {level.name}</h1>

      {/* Выбор цвета */}
      <div style={styles.colorPicker}>
        {level.colors.map((color, index) => (
          <div
            key={index}
            style={{
              ...styles.colorButton,
              backgroundColor: color,
              ...(selectedColor === color ? styles.colorButtonSelected : {}),
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
      <button
        style={styles.checkButton}
        onClick={checkLevelCompletion}
      >
        Проверить рисунок
      </button>

      {/* Сообщение о завершении уровня */}
      {isLevelCompleted && <div style={styles.message}>Вы решили уровень!</div>}
    </div>
  );
};

export default FirstLevel;
