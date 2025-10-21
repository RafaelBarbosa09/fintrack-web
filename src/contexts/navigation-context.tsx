import { createContext, useContext, useState, ReactNode } from "react";

type NavigationItem = {
  title: string;
  href: string;
};

type NavigationContextType = {
  breadcrumbs: NavigationItem[];
  setBreadcrumbs: (breadcrumbs: NavigationItem[]) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<NavigationItem[]>([
    { title: "Home", href: "/" },
  ]);
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <NavigationContext.Provider
      value={{ breadcrumbs, setBreadcrumbs, currentPage, setCurrentPage }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
