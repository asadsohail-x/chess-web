import { setStoredTheme, THEMES } from "./Themes";

const ThemeSelector = ({ selectedTheme, setTheme }) => {
  const clickHandler = (theme) => {
    setStoredTheme(theme);
    setTheme(theme);
  };
  return (
    <div className="selector">
      {THEMES.map(({ name, color, visibleName }, i) => (
        <div
          key={i}
          className={`theme-option ${selectedTheme === name ? "selected" : ""}`}
          onClick={() => clickHandler(name)}
        >
          <span>{visibleName}</span>
          <div className="preview" style={{ background: color }}></div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;
