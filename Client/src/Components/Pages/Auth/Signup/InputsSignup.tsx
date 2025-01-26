import ReactDOM from "react-dom";
import ErrorDisplay from "../../../../Context/ThemeContext/errorContext/ErrorDisplay";
import { useAuthStore } from "../../../Utility/Zustand/useAuthStore";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";
import { usePostSignup } from "../../../../Api/postSignup";

const InputsSignup = () => {
  const { closeModalSignup } = useAuthStore();
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

  const { isModalSignUp } = useAuthStore();

  return ReactDOM.createPortal(
    isModalSignUp && (
      <div className="modal-overlay fs-3 h-100 w-100">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div
            className="modal-content modal-signup d-flex flex-column border border-dark w-25 justify-content-center align-items-center"
            style={{
              backgroundColor: theme === "dark" ? "#011526" : "white",
            }}
          >
            <p className="fs-1">Sign Up</p>
            <form
              onSubmit={handleSignup}
              className="d-flex flex-column gap-2 w-100 justify-content-center align-items-center"
            >
              <div className="w-100">
                <ErrorDisplay />
              </div>

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
              <input
                className="w-100"
                name="username"
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <button
                className="fs-3 btn border border-dark btn-primary hover w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <button
                onClick={closeModalSignup}
                type="button"
                className="btn fs-3 btn-danger w-100 mt-3"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-Signup")!
  );
};

export default InputsSignup;
