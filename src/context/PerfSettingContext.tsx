import { createContext, useContext, useState, 
  type Dispatch, type SetStateAction, type ReactNode } from "react";

type PerformanceContextType = {
  perfSetting: boolean,
  setPerfSetting: Dispatch<SetStateAction<boolean>>
};

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const PerformanceSettingProvider = ({ children }: { children: ReactNode }) => {
  const [perfSetting, setPerfSetting] = useState(false);

  return (
    <PerformanceContext.Provider value={{ perfSetting, setPerfSetting }}>
      {children}
    </PerformanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePerformanceSetting = () => {
  const context = useContext(PerformanceContext);

  if (!context) {
    throw new Error("usePerformanceSetting requires a provider");
  }
  return context;
}