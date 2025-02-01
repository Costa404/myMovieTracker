import { Outlet } from "react-router-dom";
import MyArea from "../../Components/Pages/MyArea/MyArea";

const MyAreaLayout = () => {
  return (
    <div>
      <MyArea />
      <Outlet />
    </div>
  );
};

export default MyAreaLayout;
