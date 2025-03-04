import { useState } from "react";

function FirstLevel() {
    const COLORS = ["red", "green", "blue", "black", "white"];
    const CELL_SIZE = 5; // Размер одной ячейки в пикселях
    const GRID_SIZE = 45; // Количество ячеек (45x45)
    const playingField = Array(GRID_SIZE * GRID_SIZE).fill(""); 
    const [arrOfButtons, setArrOfButtons] = useState(playingField);
    const [selectedColor, setSelectedColor] = useState("white");

    const handleGridClick = (index) => {
        const newArr = [...arrOfButtons];
        newArr[index] = selectedColor;
        setArrOfButtons(newArr);
    };

    return (
        <div className="App" style={styles.app}>
            <h1>Ваш выбранный цвет: {selectedColor}</h1>

            <div style={styles.gridWrapper}>
                <div style={styles.backgroundImage}></div>
                <div style={styles.grid}>
                    {arrOfButtons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => handleGridClick(index)}
                            style={{
                                ...styles.button,
                                backgroundColor: button || "rgba(255,255,255,0.7)",
                            }}
                        ></button>
                    ))}
                </div>
            </div>

            <div>
                <h1>Choose Color</h1>
                {COLORS.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        style={{
                            ...styles.colorButton,
                            backgroundColor: color,
                        }}
                    ></button>
                ))}
            </div>
        </div>
    );
}

// Стили
const styles = {
    app: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    },
    gridWrapper: {
        position: "relative",
        width: "225px",
        height: "225px",
        border: "2px solid black",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "url(/photos/1lvl.png)",
        opacity: 0.4,
        zIndex: 0,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(45, 1fr)",
        gridTemplateRows: "repeat(45, 1fr)",
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 1,
    },
    button: {
        width: "5px", 
        height: "5px",
        border: "0.1px solid rgba(0, 0, 0, 0.1)", // Тонкие границы
        cursor: "pointer",
        padding: 0,
    },
    colorButton: {
        width: "40px",
        height: "40px",
        margin: "5px",
        border: "none",
        cursor: "pointer",
    },
};

export default FirstLevel;
