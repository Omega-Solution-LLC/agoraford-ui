/**
 * Tailwind v3 preset for @agoraford/ui.
 * Apps use: import agoraforduiPreset from "@agoraford/ui/tailwind-preset";
 * Reads every value from tokens.css. Do not hard-code values here.
 */
const rgb = (name) => `rgb(var(--ui-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    // Replaces Tailwind's default radius scale so every rounded-* class in every app
    // resolves to the shared tokens. Do not add raw radii in apps.
    borderRadius: {
      none: "0px",
      xs: "var(--ui-radius-xs)",
      sm: "var(--ui-radius-xs)",
      DEFAULT: "var(--ui-radius-xs)",
      md: "var(--ui-radius-control)",
      lg: "var(--ui-radius-card)",
      xl: "var(--ui-radius-card)",
      "2xl": "var(--ui-radius-card)",
      "3xl": "var(--ui-radius-card)",
      control: "var(--ui-radius-control)",
      card: "var(--ui-radius-card)",
      panel: "var(--ui-radius-panel)",
      pill: "var(--ui-radius-pill)",
      full: "var(--ui-radius-pill)",
    },
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
        sans: ["var(--ui-font-sans)"],
      },
      fontSize: {
        title: ["var(--ui-text-title)", { lineHeight: "36px", fontWeight: "var(--ui-weight-title)" }],
        subtitle: ["var(--ui-text-subtitle)", { lineHeight: "20px" }],
        body: ["var(--ui-text-body)", { lineHeight: "20px" }],
        control: ["var(--ui-text-control)", { lineHeight: "20px", fontWeight: "var(--ui-weight-control)" }],
        small: ["var(--ui-text-small)", { lineHeight: "16px" }],
        caption: ["var(--ui-text-caption)", { lineHeight: "14px" }],
        section: ["var(--ui-text-section)", { lineHeight: "28px", fontWeight: "var(--ui-weight-section)" }],
      },
      height: {
        topbar: "var(--ui-topbar-height)",
        "control-sm": "var(--ui-control-sm)",
        "control-md": "var(--ui-control-md)",
        "control-lg": "var(--ui-control-lg)",
      },
      width: {
        sidebar: "var(--ui-sidebar-width)",
        "control-sm": "var(--ui-control-sm)",
        "control-md": "var(--ui-control-md)",
        "control-lg": "var(--ui-control-lg)",
      },
      transitionDuration: {
        DEFAULT: "var(--ui-motion-duration)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ui-motion-easing)",
      },
      zIndex: {
        dropdown: "var(--ui-z-dropdown)",
        sticky: "var(--ui-z-sticky)",
        overlay: "var(--ui-z-overlay)",
        modal: "var(--ui-z-modal)",
        toast: "var(--ui-z-toast)",
      },
    },
  },
};
