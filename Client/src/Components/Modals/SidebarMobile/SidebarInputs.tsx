import ActionButton from "../../Utility/ActionButton";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useAuthStore } from "../Auth/useAuthStore";

const SidebarInputs = () => {
  const { openModalLogin, openModalSignup } = useAuthStore();

  const { isOnline, handleLogout } = useIsOnline();

  return (
    <div>
      {isOnline ? (
        <div className="d-flex justify-content-around mt-5">
          <ActionButton
            onClick={handleLogout}
            label="Logout"
            style={{ background: "#dc3545", border: "none" }}
          />
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
