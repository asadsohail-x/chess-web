import { goBack } from "../../Game";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineFlag } from "react-icons/ai";
import { BsCaretDown } from "react-icons/bs";
import { MdRestartAlt, MdOutlineColorLens } from "react-icons/md";
import { resetGame } from "../../Game";
import { useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";
import { getStoredTheme, THEMES } from "./Themes";

const Helper = ({ turn, resign, selectedTheme, setTheme, isInCheck }) => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  useEffect(() => {
    let theme = getStoredTheme();
    setTheme(theme);
  }, [setTheme]);

  const clickHandler = () => {
    setSelectorOpen(!selectorOpen);
  };

  return (
    <div className="helper">
      <div className="left">
        <button className="helper-btn" onClick={goBack}>
          <BiArrowBack size={20} />
          &nbsp;Take Back
        </button>
        <p className="turn">
          {turn === "w" ? "White" : "Black"}'s Turn{" "}
          {isInCheck && <span className="in-check">- IN CHECK</span>}
        </p>
      </div>
      <div className="right">
        <button className="helper-btn" onClick={resign}>
          <AiOutlineFlag size={20} />
          &nbsp;Resign
        </button>
        <button className="helper-btn" onClick={resetGame}>
          <MdRestartAlt size={20} />
          &nbsp;Restart
        </button>
        <button className="helper-btn" onClick={clickHandler}>
          <MdOutlineColorLens size={20} />
          &nbsp;{THEMES.find((t) => t.name === selectedTheme).visibleName}&nbsp;
          <BsCaretDown size={15} />
          {selectorOpen && (
            <ThemeSelector selectedTheme={selectedTheme} setTheme={setTheme} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Helper;
