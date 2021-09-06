import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native-appearance";
import { coloursDark as darkColors, coloursLight as lightColors } from "./app/colours";

export interface ThemeContextType {
    isDark: boolean;
    colors: any;
    setScheme: () => {};
}

export const ThemeContext = createContext({
    isDark: false,
    colors: lightColors,
    setScheme: () => { },
});

export const ThemeProvider = (props: any) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = Appearance.getColorScheme(); // Can be dark | light | no-preference
    console.log(colorScheme)
    /*
     * To enable changing the app theme dynamicly in the app (run-time)
     * we're gonna use useState so we can override the default device theme
     */
    const [isDark, setIsDark] = useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    Appearance.addChangeListener((appearancePrefs) => {
        setIsDark(appearancePrefs.colorScheme == "dark");
    });

    const defaultTheme = {
        isDark,
        // Chaning color schemes according to theme
        colors: isDark ? darkColors : lightColors,
        // Overrides the isDark value will cause re-render inside the context.
        setScheme: (scheme?: any) => setIsDark(scheme === "dark"), // according to typescript scheme is not present?
    };

    console.log(isDark);

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => useContext(ThemeContext);
