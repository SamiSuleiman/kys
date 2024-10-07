import pkg from "../package.json";

const manifest = {
  background: {
    scripts: ["src/entries/background/main.ts"],
    persistent: true,
  },
  content_scripts: [
    {
      js: ["src/entries/contentScript/primary/main.ts"],
      matches: ["*://*/*"],
    },
  ],
  browser_action: {
    default_icon: {
      16: "icons/16.png",
      19: "icons/19.png",
      32: "icons/32.png",
      38: "icons/38.png",
    },
    default_popup: "src/entries/popup/index.html",
  },
  icons: {
    16: "icons/16.png",
    19: "icons/19.png",
    32: "icons/32.png",
    38: "icons/38.png",
    48: "icons/48.png",
    64: "icons/64.png",
    96: "icons/96.png",
    128: "icons/128.png",
    256: "icons/256.png",
    512: "icons/512.png",
  },
  permissions: ["storage"],
  browser_specific_settings: {
    gecko: {
      id: "{20a9bb38-ed7c-4faf-9aaf-7c5d241fd747}",
    },
  },
};

export function getManifest() {
  return {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
    manifest_version: 2,
    ...manifest,
  };
}
