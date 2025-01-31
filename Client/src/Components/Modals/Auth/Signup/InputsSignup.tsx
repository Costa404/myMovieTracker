import ReactDOM from "react-dom";
import ErrorDisplay from "../../../../Context/ThemeContext/errorContext/ErrorDisplay";
import { useAuthStore } from "../useAuthStore";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";
import { usePostSignup } from "../../../../Api/post/postSignup";
import { useIsOnline } from "../../../Utility/Hooks/useIsOnline";

const InputsSignup = () => {
  const { closeModalSignup, isModalSignUp } = useAuthStore();
  const { theme } = useTheme();
  const {
    handleSignup,
    setEmail,
    setPassword,
    username,
    setUsername,
    email,
    password,
    loading,
  } = usePostSignup();

  const { isOnline } = useIsOnline();

  return ReactDOM.createPortal(
    isModalSignUp && (
      <div
        className="modal-overlay fs-3 h-100 w-100"
        style={{ zIndex: "9999" }}
      >
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div
            className="modal-content modal-signup d-flex flex-column border border-dark w-25 justify-content-center align-items-center"
            style={{
              backgroundColor: theme === "dark" ? "#121212" : "#c7c7c7",
              position: "relative",
              zIndex: 10,
              minWidth: "35rem",
            }}
          >
            {isOnline ? (
              <p className="fs-2 text-success">Account created successfully!</p>
            ) : (
              <>
                <p className="fs-1">Sign Up</p>
                <form
                  onSubmit={handleSignup}
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
                    className="w-75"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="w-75"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <button
                    className="fs-3 btn border border-dark btn-primary hover w-75 mt-3 mb-4"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>
              </>
            )}

            <button
              className="btn btn-danger position-absolute text-white px-3 fs-4"
              onClick={closeModalSignup}
              style={{
                top: "1rem",
                right: "1rem",
                zIndex: 20,
              }}
            >
              X
            </button>
            <div
              style={{
                position: "absolute",
                bottom: "2.5rem",
                left: "20%",
                width: "100%",
                textAlign: "center",
              }}
            >
              <ErrorDisplay />
            </div>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-Signup")!
  );
};

export default InputsSignup;
