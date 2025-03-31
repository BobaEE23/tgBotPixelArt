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
      justifyContent: "flex-start",
      minHeight: "100vh",
      padding: "20px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      backgroundAttachment: "fixed",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#3a4a6b",
      margin: "20px 0",
      textAlign: "center",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    colorPicker: {
      margin: "20px 0",
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "100%",
      padding: "0 10px",
    },
    // ... остальные стили сетки остаются без изменений
    checkButton: {
      marginTop: "25px",
      padding: "12px 30px",
      fontSize: "1rem",
      fontWeight: "600",
      color: "#fff",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(79, 172, 254, 0.3)",
    },
    checkButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(79, 172, 254, 0.4)",
    },
    message: {
      marginTop: "25px",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#4facfe",
      textAlign: "center",
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
