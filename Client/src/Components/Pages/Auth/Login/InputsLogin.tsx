import ReactDOM from "react-dom";
import ErrorDisplay from "../../../../Context/ThemeContext/errorContext/ErrorDisplay";
import { useAuthStore } from "../../../Utility/Zustand/useAuthStore";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";

import { useIsOnline } from "../../../Utility/Hooks/useIsOnline";
import { usePostLogin } from "../../../../Api/postLogin";
import { useEffect } from "react";

const InputsLogin = () => {
  const { closeModalLogin, isModalLogin } = useAuthStore();
  const { theme } = useTheme();
  const { isOnline } = useIsOnline();

  const { handleLogin, setPassword, setEmail, email, password, loading } =
    usePostLogin();

  useEffect(() => {}, [isOnline]); // console.log("email", email);
  // console.log("password", password);

  return ReactDOM.createPortal(
    isModalLogin && (
      <div className="modal-overlay fs-3 h-100 w-100">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div
            className="modal-content modal-signup d-flex flex-column border border-dark w-25 justify-content-center align-items-center"
            style={{
              backgroundColor: theme === "dark" ? "black" : "white",
            }}
          >
            {!isOnline ? (
              <>
                <p className="fs-1">Login</p>
                <form
                  onSubmit={handleLogin}
                  className="d-flex flex-column gap-2 w-100 justify-content-center align-items-center"
                >
                  <input
                    className="w-100"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    className="w-100"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    className="fs-3 btn border border-dark btn-primary hover w-100 mt-3"
                    disabled={loading}
                  >
                    {loading ? "Logging ..." : "Login"}
                  </button>

                  <button
                    onClick={closeModalLogin}
                    type="button"
                    className="btn fs-3 btn-danger w-100 mt-3"
                  >
                    Close
                  </button>
                  <ErrorDisplay />
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-success">Login Successfully!</h2>

                <button
                  onClick={closeModalLogin}
                  type="button"
                  className="btn fs-3 btn-primary w-50 mt-4"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-Login")!
  );
};

export default InputsLogin;
