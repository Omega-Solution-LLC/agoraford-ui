/**
 * Tailwind v3 preset for @agoraford/ui.
 * Apps use: import agoraforduiPreset from "@agoraford/ui/tailwind-preset";
 * Reads every value from tokens.css. Do not hard-code values here.
 */
const rgb = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: rgb("brand"),
          hover: rgb("brand-hover"),
          soft: rgb("brand-soft"),
          strong: rgb("brand-strong"),
        },
        background: rgb("background"),
        surface: {
          DEFAULT: rgb("surface"),
          muted: rgb("surface-muted"),
        },
        foreground: rgb("foreground"),
        "muted-foreground": rgb("muted-foreground"),
        border: {
          DEFAULT: rgb("border"),
          strong: rgb("border-strong"),
        },
        sidebar: {
          DEFAULT: rgb("sidebar"),
          foreground: rgb("sidebar-foreground"),
          muted: rgb("sidebar-muted"),
          active: rgb("sidebar-active"),
          item: rgb("sidebar-item"),
          border: rgb("sidebar-border"),
        },
        success: rgb("success"),
        warning: rgb("warning"),
        danger: rgb("danger"),
        info: rgb("info"),
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        title: ["var(--text-title)", { lineHeight: "36px", fontWeight: "var(--weight-title)" }],
        subtitle: ["var(--text-subtitle)", { lineHeight: "20px" }],
        body: ["var(--text-body)", { lineHeight: "20px" }],
        control: ["var(--text-control)", { lineHeight: "20px", fontWeight: "var(--weight-control)" }],
        small: ["var(--text-small)", { lineHeight: "16px" }],
        caption: ["var(--text-caption)", { lineHeight: "14px" }],
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
        pill: "var(--radius-pill)",
      },
      height: {
        topbar: "var(--topbar-height)",
        "control-sm": "var(--control-sm)",
        "control-md": "var(--control-md)",
        "control-lg": "var(--control-lg)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
        "control-sm": "var(--control-sm)",
        "control-md": "var(--control-md)",
        "control-lg": "var(--control-lg)",
      },
      transitionDuration: {
        DEFAULT: "var(--motion-duration)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--motion-easing)",
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
    },
  },
};
