import pkg from "../package.json";

const manifest = {
  content_scripts: [
    {
      js: ["src/entries/contentScript/primary/main.ts"],
      matches: ["*://*/*"],
    },
  ],
  browser_action: {
    default_icon: {
      16: "icons/16.png",
      32: "icons/32.png",
      48: "icons/48.png",
      96: "icons/96.png",
      180: "icons/180.png",
      192: "icons/192.png",
      512: "icons/512.png",
    },
    default_popup: "src/entries/popup/index.html",
  },
  icons: {
    16: "icons/16.png",
    32: "icons/32.png",
    48: "icons/48.png",
    96: "icons/96.png",
    180: "icons/180.png",
    192: "icons/192.png",
    512: "icons/512.png",
  },
  permissions: ["storage", "activeTab"],
  browser_specific_settings: {
    gecko: {
      id: "kys@browser-ext.samisul.com",
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
