import "./loader.css";
import { blackLogo } from "../../../assets";
const CALoader = () => {
  return (
    <div className="fade-animation">
      <img
        src={blackLogo}
        alt="logo"
        className="w-[80px] h-[80px] rounded-full"
      />
    </div>
  );
};

export default CALoader;
