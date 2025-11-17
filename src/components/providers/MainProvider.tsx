import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const MainProvider = ({ children }: Props) => {
  return (
    <StrictMode>
      <CookiesProvider>
        <Toaster />
        {children}
      </CookiesProvider>
    </StrictMode>
  );
};

export default MainProvider;
