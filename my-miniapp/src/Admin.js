import { useState, useRef } from "react";

export const Admin = () => {
  const [image, setImage] = useState(null);
  const [gridSize, setGridSize] = useState(100);
  const [arrOfColors, setArrOfColors] = useState([]);
  const [inputColor, setInputColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [pixelColors, setPixelColors] = useState({});
  const CELL_SIZE = 5;
  const canvasRef = useRef(null);

  const addLevelToDatabase = async () => {
    const levelData = {
      name: "Level 1",
      image,
      grid_size: gridSize,
      cell_size: CELL_SIZE,
      colors: arrOfColors,
      pixel_colors: pixelColors,
    };

    try {
      const response = await fetch("https://tgbotpixelart.onrender.com/api/levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(levelData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при сохранении уровня");
      }

      const data = await response.json();
      console.log("Уровень успешно добавлен:", data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const newGridSizeX = Math.ceil(img.width / CELL_SIZE);
          const newGridSizeY = Math.ceil(img.height / CELL_SIZE);
          const maxGridSize = Math.max(newGridSizeX, newGridSizeY);
          setGridSize(maxGridSize);

          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const scaledImage = canvas.toDataURL();
          setImage(scaledImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    setInputColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputColor.trim()) {
      setArrOfColors([...arrOfColors, inputColor]);
      setInputColor("");
    }
  };

  const handlePixelClick = (index) => {
    if (selectedColor) {
      setPixelColors((prevColors) => ({
        ...prevColors,
        [index]: selectedColor,
      }));
    }
  };

  const FIELD_WIDTH = gridSize * CELL_SIZE;
  const FIELD_HEIGHT = gridSize * CELL_SIZE;

  const styles = {
    adminContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
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
    headerAdminTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    headerAdminAddLevel: {
      fontSize: "1.5rem",
      color: "#555",
      marginBottom: "20px",
    },
    fileInput: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "15px",
      cursor: "pointer",
    },
    addColorsTitle: {
      fontSize: "1.5rem",
      color: "#555",
      marginTop: "20px",
      marginBottom: "10px",
    },
    inputColor: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginRight: "10px",
      width: "200px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#6200ea",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s",
      margin: "5px",
    },
    buttonHover: {
      backgroundColor: "#4b00b3",
    },
    colorButton: {
      padding: "10px 15px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      margin: "5px",
    },
  };

  return (
    <div style={styles.adminContainer}>
      <h1 style={styles.headerAdminTitle}>Панель Админа</h1>
      <h3 style={styles.headerAdminAddLevel}>Создание Уровня</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div style={styles.gridWrapper}>
        {image && (
          <div
            style={{
              ...styles.backgroundImage,
              backgroundImage: `url(${image})`,
            }}
          ></div>
        )}
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

      <h1 style={styles.addColorsTitle}>Добавление цветов на уровень</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputColor}
          onChange={handleInputChange}
          placeholder="Введите цвет"
          style={styles.inputColor}
        />
        <button type="submit" style={styles.button}>Добавить цвет</button>
      </form>
      {arrOfColors.map((color, index) => (
        <button
          onClick={() => setSelectedColor(color)}
          key={index}
          style={{ ...styles.colorButton, backgroundColor: color }}
        >
          {color}
        </button>
      ))}

      <button onClick={addLevelToDatabase} style={styles.button}>
        Сохранить уровень
      </button>
    </div>
  );
};
