import chashuRamen from "./chashu-ramen-3d-icon-png-download-9666063.png";
import beltimage from "./conveyor-belt.png";
import chefimage from "./ramen-jiro-rice-soup-menu-png.png";
import waiterimage from "./ramen-waiter.png";
import "./style.css";

document.body.innerHTML = `
  <h1>WELCOME TO</h1>
  <h1>RAMEN COUNTER</h1>
  <p>Ramen Counter: <span id="counter">0</span></p>
  <p id="status">0 🍜/sec</p>
  <p id="upgrades">Chefs: 0 | Conveyer Belts: 0 | Waiters: 0</p>

  <button id="Ramen"><img src="${chashuRamen}" class="icon" /></button>
  <button id="Chefs" disabled>More Chefs<img src="${chefimage}" class="icon" /> (+1/sec, 10 🍜)</button>
  <button id="Belts" disabled>More Conveyer <img src="${beltimage}" class="icon" /> (+5/sec, 100 🍜)</button>
  <button id="Waiters" disabled>More Waiters <img src="${waiterimage}" class="icon" />  (+50/sec, 1000 🍜)</button>
  `;

// Add click handler

const ramenButton = document.getElementById("Ramen")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;

const chefsButton = document.getElementById("Chefs") as HTMLButtonElement;
const beltsButton = document.getElementById("Belts") as HTMLButtonElement;
const waitersButton = document.getElementById("Waiters") as HTMLButtonElement;

// Ramen variables
let ramen: number = 0;
let ramenPerSecond: number = 0;
let displayedRamen: number = 0;

// Upgrades
const upgradesElement = document.getElementById("upgrades")!;

let costChefs: number = 10;
const rateChefs: number = 1;
let countChefs: number = 0;

let costBelts: number = 100;
const rateBelts: number = 5;
let countBelts: number = 0;

let costWaiters: number = 1000;
const rateWaiters: number = 50;
let countWaiters: number = 0;

// Manual click adds ramen
ramenButton.addEventListener("click", () => {
  ramen += 1;
  counterElement.textContent = Math.floor(ramen).toString();
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
});

// Purchase upgrade
chefsButton.addEventListener("click", () => {
  if (ramen >= costChefs) {
    ramen -= costChefs;
    ramenPerSecond += rateChefs;
    countChefs += 1;
    costChefs *= 1.5;
    counterElement.textContent = Math.floor(ramen).toString();
    statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
    chefsButton.textContent = `More Chefs(+${rateChefs}/sec, ${
      Math.floor(costChefs)
    } 🍜)`;
    upgradesElement.textContent =
      `Chefs: ${countChefs} | Conveyer Belts: ${countBelts} | Waiters: ${countWaiters}`;
  }
});

beltsButton.addEventListener("click", () => {
  if (ramen >= costBelts) {
    ramen -= costBelts;
    ramenPerSecond += rateBelts;
    countBelts += 1;
    costBelts *= 1.5;
    counterElement.textContent = Math.floor(ramen).toString();
    statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
    beltsButton.textContent = `More Conveyer Belts(+${rateBelts}/sec, ${
      Math.floor(costBelts)
    } 🍜)`;
    upgradesElement.textContent =
      `Chefs: ${countChefs} | Conveyer Belts: ${countBelts} | Waiters: ${countWaiters}`;
  }
});

waitersButton.addEventListener("click", () => {
  if (ramen >= costWaiters) {
    ramen -= costWaiters;
    ramenPerSecond += rateWaiters;
    countWaiters += 1;
    costWaiters *= 1.5;
    counterElement.textContent = Math.floor(ramen).toString();
    statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
    waitersButton.textContent = `More Waiters(+${rateWaiters}/sec, ${
      Math.floor(costWaiters)
    } 🍜)`;
    upgradesElement.textContent =
      `Chefs: ${countChefs} | Conveyer Belts: ${countBelts} | Waiters: ${countWaiters}`;
  }
});

// Automatically adds ramen once per second
setInterval(() => {
  ramen += ramenPerSecond;
  counterElement.textContent = ramen.toString();
  if (ramen >= costChefs) {
    chefsButton.disabled = false;
  }
  if (ramen >= costBelts) {
    beltsButton.disabled = false;
  }
  if (ramen >= costWaiters) {
    waitersButton.disabled = false;
  }
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
  upgradesElement.textContent =
    `Chefs: ${countChefs} | Conveyer Belts: ${countBelts} | Waiters: ${countWaiters}`;
}, 1000);

// Smoothly animate the counter
function animate() {
  displayedRamen += (ramen - displayedRamen) * 0.1;
  counterElement.textContent = Math.floor(displayedRamen).toString();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
