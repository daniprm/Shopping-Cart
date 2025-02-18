import { createContext, ReactElement, useContext, useState } from "react";

type DarkModeType = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};
const initState = {
  isDarkMode: false,
  setIsDarkMode: () => {},
};

type ChildrenType = { children?: ReactElement | ReactElement[] };
const DarkModeContext = createContext<DarkModeType | undefined>(initState);

const DarkModeContextProvider = ({ children }: ChildrenType) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export default DarkModeContextProvider;
