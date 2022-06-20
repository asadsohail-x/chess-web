export const THEMES = [
  { name: "black", color: "#0a0a0a", visibleName: "Black Sand" },
  { name: "blue", color: "#1f4174", visibleName: "Galaxy" },
  { name: "brown", color: "#4b291d", visibleName: "Beer" },
  { name: "purple", color: "#31184c", visibleName: "Abstract" },
  { name: "green", color: "#354e36", visibleName: "In the Woods" },
];

export const setStoredTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

export const getStoredTheme = () => {
  if (localStorage.getItem("theme")) {
    let theme = localStorage.getItem("theme");
    let valid = false;
    for (let i = 0; i < THEMES.length; i++) {
      if (THEMES[i].name === theme) {
        valid = true;
        break;
      }
    }
    if (valid) {
      return theme;
    }
  }
  return THEMES[0].name;
};
