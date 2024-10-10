import browser from "webextension-polyfill";
import { Bind } from "~/entries/shared/model";

init();

async function init() {
  const binds = await browser.storage.local.get("binds");
  document.addEventListener("keydown", (e) => {
    const domain = new URL(window.location.href).hostname;
    const bound: Bind = binds?.binds?.find(
      (bind: Bind) => bind.key === e.key && bind.domain === domain,
    );
    if (!bound) return;
    const el = document.querySelector(bound.elementSelector);
    if (!el) return;
    (el as HTMLElement).click();
  });
}
