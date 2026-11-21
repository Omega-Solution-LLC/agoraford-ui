import type { Preview } from "@storybook/react-vite";
import "../src/tokens/tokens.css";
import "./storybook.css";
import { TooltipProvider } from "../src/index";

/** Light and dark: toggles the .dark class on <html>, which the tokens key off. */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: { title: "Theme", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.classList.toggle("dark", context.globals.theme === "dark");
      return (
        <TooltipProvider>
          <div className="min-h-dvh bg-background p-6 font-sans text-body text-foreground">
            <Story />
          </div>
        </TooltipProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
