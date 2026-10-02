const dotPattern = (color: string) =>
  `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23${color}' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`;

// Dotted grid backgrounds used behind hero sections
export const dotPatterns = {
  light: { default: dotPattern("a8a29e"), hover: dotPattern("6366f1") },
  dark: { default: dotPattern("404040"), hover: dotPattern("8183f4") },
};
