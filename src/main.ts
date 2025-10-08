import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <h1>RAMEN COUNTER</h1>
  <p>Ramen Counter: <span id="counter">0</span></p>
  <button id="Ramen">🍜</button>
  <button id="upgrade" disabled>UPGRADE 🍜 (+1/sec, 10 🍜)</button>
  `;

// Add click handler
const ramenButton = document.getElementById("Ramen")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade") as HTMLButtonElement;

let ramen: number = 0;
let ramenPerSecond: number = 0;

// Manual click adds ramen
ramenButton.addEventListener("click", () => {
  ramen += 1;
  counterElement.textContent = ramen.toString();
});

// Purchase upgrade
upgradeButton.addEventListener("click", () => {
  if (ramen >= 10) {
    ramen -= 10;
    ramenPerSecond += 1;
    counterElement.textContent = ramen.toString();
    upgradeButton.disabled = true;
  }
});

// Automatically adds ramen once per second
setInterval(() => {
  ramen += ramenPerSecond;
  counterElement.textContent = ramen.toString();
  if (ramen >= 10) {
    upgradeButton.disabled = false; // Enable button when enough ramen
  }
}, 1000);
