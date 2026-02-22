import { createContext, useContext, useState } from "react";

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
  return (
    <ScreenFlashContext.Provider
      value={{ flashEnabled, toggleFlash: () => setFlashEnabled((p) => !p) }}
    >
      {children}
    </ScreenFlashContext.Provider>
  );
}

export function useScreenFlash() {
  return useContext(ScreenFlashContext);
}
