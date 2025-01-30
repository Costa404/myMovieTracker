import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";
const BtnDarkLightMode = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className="iconLight position-fixed px-3"
      style={{ bottom: "0", right: "0" }}
    >
      <button onClick={toggleTheme} className="btn">
        {theme === "dark" ? (
          <MdOutlineDarkMode className="fs-1 text-white" />
        ) : (
          <MdDarkMode className=" text-black fs-1" />
        )}
      </button>
    </div>
  );
};

export default BtnDarkLightMode;
