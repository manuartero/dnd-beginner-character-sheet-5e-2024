import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

type ScreenFlashContextValue = {
  flashEnabled: boolean;
  toggleFlash: () => void;
};

const ScreenFlashContext = createContext<ScreenFlashContextValue>({
  flashEnabled: false,
  toggleFlash: () => {},
});

type ScreenFlashProviderProps = {
  children: ReactNode;
};

export function ScreenFlashProvider({ children }: ScreenFlashProviderProps) {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const toggleFlash = useCallback(() => setFlashEnabled((p) => !p), []);
  const value = useMemo(
    () => ({ flashEnabled, toggleFlash }),
    [flashEnabled, toggleFlash],
  );
  return (
    <ScreenFlashContext.Provider value={value}>
      {children}
    </ScreenFlashContext.Provider>
  );
}

export function useScreenFlash() {
  return useContext(ScreenFlashContext);
}
