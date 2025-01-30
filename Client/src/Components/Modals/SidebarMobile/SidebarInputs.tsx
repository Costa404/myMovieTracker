import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useAuthStore } from "../../Utility/Zustand/useAuthStore";

const SidebarInputs = () => {
  const { openModalLogin, openModalSignup } = useAuthStore();
  const { theme } = useTheme();
  const { isOnline, handleLogout } = useIsOnline();

  return (
    <div>
      {isOnline ? (
        <div className="d-flex justify-content-around mt-5">
          <button
            onClick={handleLogout}
            className="  p-2 fw-bold btn btn-danger fs-4 px-4 rounded-5  btnTransform"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-around mt-5">
          <button
            onClick={openModalLogin}
            className="p-2 fw-semibold fs-4 px-4 rounded-5"
            style={{
              background: theme === "dark" ? "#c7c7c7" : "#121212",
              border: "none",
            }}
          >
            Login
          </button>
          <button
            onClick={openModalSignup}
            className="p-2 fw-semibold fs-4 px-4 rounded-5"
            style={{
              background: theme === "dark" ? "#c7c7c7" : "#121212",
              color: theme === "dark" ? "#333333" : " #e0e0e0",
              border: "none",
            }}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarInputs;
