import { useAuthStore } from "../../../Utility/Zustand/useAuthStore";
import InputsLogin from "./InputsLogin";

const Login = () => {
  const { isModalLogin } = useAuthStore();

  return (
    <div className=" w-100 h-100" style={{ minWidth: "40rem" }}>
      {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
        Homepage
        </button> */}
      {isModalLogin ? <InputsLogin /> : null}
    </div>
  );
};

export default Login;
