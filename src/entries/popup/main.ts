import browser from "webextension-polyfill";
import "./style.css";
import { Bind } from "./model";

async function init() {
  const _binds = await browser.storage.local.get("binds");
  console.log(_binds);

  document.querySelector("#app")!.innerHTML = `
  <main>
    <ul id="binds"></ul>
  </main>
`;

  // const buttonElement = document.querySelector("button")!;
  // buttonElement.addEventListener("click", () => {
  //   count += 1;
  //
  //   buttonElement.textContent = `Clicks: ${count}`;
  // });
}
