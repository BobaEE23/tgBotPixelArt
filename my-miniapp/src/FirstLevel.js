import { useState } from "react";

const FirstLevel = ({ level }) => {
  

  const [pixelColors, setPixelColors] = useState(level.pixel_colors || {});

  const handlePixelClick = (index) => {
    const newColor = "#FF0000"; 
    setPixelColors((prevColors) => ({
      ...prevColors,
      [index]: newColor,
    }));
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
    </div>
  );
};

export default FirstLevel;
