import ReactDOM from "react-dom";
import ErrorDisplay from "../../../../Context/ThemeContext/errorContext/ErrorDisplay";
import { useAuthStore } from "../useAuthStore";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";

import { usePostLogin } from "../../../../Api/post/postLogin";
import { useEffect } from "react";
import { useIsOnline } from "../../../Utility/Hooks/useIsOnline";
import ActionButton from "../../../Utility/ActionButton";

const InputsLogin = () => {
  const { closeModalLogin, isModalLogin, openModalSignup } = useAuthStore();
  const { theme } = useTheme();
  const { isOnline } = useIsOnline();
  console.log("isOnline", isOnline);

  const { handleLogin, setPassword, setEmail, email, password, loading } =
    usePostLogin();

  useEffect(() => {}, [isOnline]);

  const handleChangeLoginForSignup = () => {
    openModalSignup();
    closeModalLogin();
  };

  return ReactDOM.createPortal(
    isModalLogin && (
      <div
        className="modal-overlay fs-3 h-100 w-100 modalInputMobile"
        style={{ zIndex: "9999" }}
      >
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div
            className="modal-content modal-signup d-flex flex-column border border-dark w-25 justify-content-center align-items-center position-relative"
            style={{
              backgroundColor: theme === "dark" ? "#121212" : "#c7c7c7",
              zIndex: 10,
              minWidth: "35rem",
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
                    className="w-75"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    className="w-75 mb-3"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <ActionButton
                    label={loading ? "Logging.." : "Login"}
                    disabled={loading}
                    style={{ minWidth: "50%" }}
                  />

                  {/* <button
                    className="fs-3 btn border border-dark btn-primary hover w-75 mt-3"
                    disabled={loading}
                  >
                    {loading ? "Logging.." : "Login"}
                  </button> */}

                  <button
                    onClick={handleChangeLoginForSignup}
                    type="button"
                    className="btn fs-3 border-dark w-50 mt-3 mb-4"
                  >
                    Create account
                  </button>
                </form>

                <div
                  style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    left: "23%",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <ErrorDisplay />
                </div>
              </>
            ) : (
              <div className="text-center d-flex flex-column gap-3">
                <h2 className="text-success">Login Successfully!</h2>
                <ActionButton onClick={closeModalLogin} label="Close" />
                {/* <button
       
                  type="button"
                  className="btn fs-3 btn-primary w-50 mt-4"
                >
                  Close
                </button> */}
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
