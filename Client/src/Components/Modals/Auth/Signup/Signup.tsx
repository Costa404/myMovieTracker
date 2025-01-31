import { useAuthStore } from "../useAuthStore";
import InputsSignup from "./InputsSignup";

const Signup = () => {
  const { isModalSignUp } = useAuthStore();

  return (
    <div className=" w-100 h-100">
      {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
        Homepage
      </button> */}
      {isModalSignUp ? <InputsSignup /> : null}
    </div>
  );
};

export default Signup;
