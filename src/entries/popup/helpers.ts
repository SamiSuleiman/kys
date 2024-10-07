import { Bind } from "./model";
import browser from "webextension-polyfill";

export function createBindListItem(bind: Bind) {
  const li = document.createElement("li");
  li.id = bind.id;
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("bind__remove-btn");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", async (e) => {
    const li = (e.target as HTMLElement).parentElement;
    const id = li?.id;
    if (!id) return;
    const binds = await browser.storage.local.get("binds");
    const newBinds = binds.binds.filter((bind: Bind) => bind.id !== id);
    await browser.storage.local.set({ binds: newBinds });
    li?.remove();
  });
  li.appendChild(removeBtn);
  const span = document.createElement("span");
  span.textContent = ` ${bind.elementSelector} - ${bind.key}`;
  li.appendChild(span);
  return li;
}
