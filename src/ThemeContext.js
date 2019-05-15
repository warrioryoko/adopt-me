import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]); // This is what a hook as an argument will look like

export default ThemeContext;
