// Tailwind v3 config for Storybook and local development. Apps use the preset from the package.
import agoraforduiPreset from "./src/tokens/tailwind-preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [agoraforduiPreset],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
};
