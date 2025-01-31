import { useAuthStore } from "../useAuthStore";
import InputsLogin from "./InputsLogin";

const Login = () => {
  const { isModalLogin } = useAuthStore();

  return (
    <div className=" w-100 h-100" style={{ minWidth: "40rem" }}>
      {isModalLogin ? <InputsLogin /> : null}
    </div>
  );
};

export default Login;
