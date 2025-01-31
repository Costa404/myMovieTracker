import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import ActionButton from "../../Utility/ActionButton";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useAuthStore } from "../../Utility/Zustand/useAuthStore";

const SidebarInputs = () => {
  const { openModalLogin, openModalSignup } = useAuthStore();

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
          <ActionButton label="Signup" onClick={openModalSignup} />
          <ActionButton label="Login" onClick={openModalLogin} />
        </div>
      )}
    </div>
  );
};

export default SidebarInputs;
