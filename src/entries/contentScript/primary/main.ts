import browser from "webextension-polyfill";
import { Bind } from "~/entries/shared/model";

init();

async function init() {
  const binds = await browser.storage.local.get("binds");
  document.addEventListener("keydown", (e) => {
    const bound: Bind = binds?.binds?.find((bind: Bind) => bind.key === e.key);
    console.log(bound);
    if (!bound) return;

    const el = document.querySelector(bound.elementSelector);
    console.log(el);
    if (!el) return;

    (el as HTMLElement).click();
  });
}
