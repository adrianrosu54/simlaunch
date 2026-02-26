import { createContext, useContext, useMemo, useState, 
    type Dispatch, 
    type ReactNode, 
    type SetStateAction} from "react";

export type View = "Side View" | "Top View" | "Gradient Descent";

type AppContextType = {
    perfMode: boolean;
    setPerfMode: Dispatch<SetStateAction<boolean>>;
    view: View;
    setView: Dispatch<SetStateAction<View>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode}) => {
    const [perfMode, setPerfMode] = useState(false);
    const [view, setView] = useState<View>("Side View");

    const value = useMemo(() => ({
        perfMode, setPerfMode,
        view, setView,
    }), [perfMode, view]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp requires an AppProvider");
    }
    return context;
}