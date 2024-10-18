import browser from "webextension-polyfill";
import { Bind } from "~/entries/shared/model";

init();

let currentChord: string[] = [];

async function init() {
  const data = await browser.storage.local.get("binds");
  document.addEventListener("keydown", (e) => {
    const domain = new URL(window.location.href).hostname;
    currentChord.push(e.key);

    currentChord.forEach((chord, index) => {
      if (
        !data.binds.find(
          (bind: Bind) => bind.keys[index] === chord && bind.domain === domain,
        )
      ) {
        currentChord = [];
        return;
      }
    });

    const matched = data.binds.find((bind: Bind) => {
      return (
        bind.keys.every((chord, index) => chord === currentChord[index]) &&
        bind.domain === domain
      );
    });

    if (!matched) return;

    const el = document.querySelector(matched.selector);
    if (!el) return;
    (el as HTMLElement).click();
    currentChord = [];
  });
}
