import React, { useState } from "react";
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from "@mui/material/styles";
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("light");

    const toggleTheme = () => {
        const newThemeMode = themeMode === "light" ? "dark" : "light";
        setThemeMode(newThemeMode);
    };

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1440,
                xl: 1660,
            },
        },
        palette: {
            mode: themeMode,
            primary: { main: "#ED2023" },
            secondary: { main: "#CCCCCB" },

            background: {
                default: themeMode === "light" ? "" : "#000000",
                paper: themeMode === "light" ? "#ffffff" : "#1B1B1B",
            },
            text: {
                primary: themeMode === "light" ? "#000000" : "#ffffff",
                secondary: themeMode === "light" ? "#000000" : "#ffffff",
            },
            borderColor: themeMode === "light" ? "#ffffff" : "#373737",
            highL: themeMode === "light" ? "#FFF42C" : "#6900FF",
        },

        typography: {
            fontFamily: "SF Pro Display",
            h1: {
                fontSize: "59px",
                lineHeight: "120%",
                fontWeight: "700",
                "@media (max-width:1440px)": {
                    fontSize: "42px",
                },
            },
            h2: {
                fontSize: "32px",
                fontWeight: "700",
                "@media (max-width:600px)": {
                    fontSize: "28px",
                },
            },
            h3: {
                fontSize: "30px",
                // fontWeight: "700",
                "@media (max-width:1440px)": {
                    fontSize: "30px",
                },
                "@media (max-width:600px)": {
                    fontSize: "25px",
                },
            },
            h4: {
                fontSize: "30px",
                fontWeight: "400",
                "@media (max-width:1440px)": {
                    fontSize: "20px",
                },
            },
            h5: {
                fontSize: "20px",
                fontWeight: "600",
            },
            h6: {
                fontSize: "18px",
                fontWeight: "400",
                "@media (max-width:1440px)": {
                    fontSize: "16px",
                },
            },
            subtitle1: {
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
            },
            subtitle2: {
                fontSize: "12px",
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>{" "}
        </ThemeContext.Provider>
    );
};
