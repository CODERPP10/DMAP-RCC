import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS variables for our color scheme
const customCssVariables = `
  :root {
    --primary-50: #EFF6FF;
    --primary-100: #DBEAFE;
    --primary-200: #BFDBFE;
    --primary-300: #93C5FD;
    --primary-400: #60A5FA;
    --primary-500: #3B82F6;
    --primary-600: #2563EB;
    --primary-700: #1D4ED8;
    --primary-800: #1E3A8A;
    --primary-900: #1E3A8A;
    --secondary-50: #FFF7ED;
    --secondary-100: #FFEDD5;
    --secondary-200: #FED7AA;
    --secondary-300: #FDBA74;
    --secondary-400: #FB923C;
    --secondary-500: #F97316;
    --secondary-600: #EA580C;
    --secondary-700: #C2410C;
    --secondary-800: #9A3412;
    --secondary-900: #7C2D12;
    --dark: #1F2937;
    --light: #F3F4F6;
    --font-family: 'Inter', sans-serif;
  }

  body {
    font-family: var(--font-family);
  }
`;

// Add the custom CSS to the document
const style = document.createElement('style');
style.textContent = customCssVariables;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
