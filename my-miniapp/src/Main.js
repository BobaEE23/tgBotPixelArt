import { useState } from "react";
import FirstLevel from "./FirstLevel";

export const Main = () => {
    const [currentScreen, setCurrentScreen] = useState("main"); // Храним текущее состояние экрана

    return (
        <>
            {currentScreen === "main" ? (
                <div style={styles.levels}>
                    <button 
                        onClick={() => setCurrentScreen("first")} // Меняем состояние на FirstLevel
                        style={styles.level}
                    >
                        <h1 style={styles.levelTitle}>1</h1>
                    </button>
                </div>
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
    },
    levelTitle: {
        color: "#ffffff",
        fontSize: "2rem",
        fontWeight: "bold",
        margin: 0,
    },
};
