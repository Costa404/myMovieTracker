import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.tsx";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext.tsx";
import { ErrorProvider } from "./Context/ThemeContext/errorContext/useError.tsx";
import { SelectedMovieProvider } from "./Context/useSelectedMovie.tsx";
import { CurrentUserProvider } from "./Context/useCurrentUserAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <SelectedMovieProvider>
            <App />
          </SelectedMovieProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </ErrorProvider>
  </StrictMode>
);
