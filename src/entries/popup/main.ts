import browser from "webextension-polyfill";
import "./style.css";
import { Bind } from "../shared/model";
import { createBindListItem } from "./helpers";

populateBinds();
init();

async function populateBinds() {
  const binds = await browser.storage.local.get("binds");
  const bindsListEl = document.querySelector(".binds__list");

  if (binds?.binds)
    binds?.binds?.forEach((bind: Bind) =>
      bindsListEl?.appendChild(createBindListItem(bind)),
    );
}

async function init() {
  document.querySelector("#app")!.innerHTML = `
    <div class="form">
      <div class="form__input__container">
        <label for="selector">Selector</label>
        <input type="text" class="form__input-selector" placeholder="ex.: \`button.mdc-icon-button:nth-child(3)\`" required></input>
        <label for="keybind">Keybind</label>
        <input type="text" class="form__input-keybind" placeholder="ex.: \`g Enter\` or \`x\`" required pattern="[A-Za-z0-9 ]{1,}"></input>
      </div>
      <button class="form__add-btn" type="button">Add</button>
      <span class="form__error-msg hidden">Invalid input(s)</span>
    </div>
    <div class="binds__container">
      <h3>Binds</h3>
      <ul class="binds__list"></ul>
    </div>
`;

  const formAddBtn = document.querySelector(".form__add-btn");

  formAddBtn?.addEventListener("click", async () => {
    const selectorEl = document.querySelector(
      ".form__input-selector",
    ) as HTMLInputElement;
    const keybindEl = document.querySelector(
      ".form__input-keybind",
    ) as HTMLInputElement;
    const errorEl = document.querySelector(".form__error-msg");
    const bindsListEl = document.querySelector(".binds__list");

    if (!selectorEl || !keybindEl || !errorEl || !bindsListEl) return;

    errorEl.classList.add("hidden");

    if (!selectorEl.validity.valid || !keybindEl.validity.valid) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = "Invalid input(s)";
      return;
    }

    const data = await browser.storage.local.get("binds");
    const currTab = (
      await browser.tabs.query({ active: true, currentWindow: true })
    ).find((tab) => tab.active);
    const domain = new URL(currTab?.url ?? "")?.hostname;

    if (
      data?.binds?.find(
        (bind: Bind) =>
          bind.keys.join(" ") === keybindEl.value && bind.domain === domain,
      )
    ) {
      errorEl.textContent = "Bind already exists";
      errorEl.classList.remove("hidden");
      return;
    }

    const newBind: Bind = {
      id: Math.random().toString(36),
      selector: selectorEl.value,
      keys: keybindEl.value.split(" "),
      domain,
    };

    const newBinds = data.binds ? [...data.binds, newBind] : [newBind];
    await browser.storage.local.set({ binds: newBinds });
    bindsListEl.appendChild(createBindListItem(newBind));
  });
}
