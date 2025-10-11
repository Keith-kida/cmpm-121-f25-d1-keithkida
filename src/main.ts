import chashuRamen from "./chashu-ramen-3d-icon-png-download-9666063.png";
import beltimage from "./conveyor-belt.png";
import deliveryimage from "./delivery-man.png";
import managerimage from "./manager.png";
import chefimage from "./ramen-jiro-rice-soup-menu-png.png";
import waiterimage from "./ramen-waiter.png";
import "./style.css";

document.body.innerHTML = `
  <div style="text-align: center;">
    <h1>WELCOME TO</h1>
    <h1>RAMEN COUNTER</h1>
    <p>Ramen Counter: <span id="counter">0</span></p>
    <p id="status">0 🍜/sec</p>
    <p id="upgrades">Chefs: 0 | Conveyer Belts: 0 | Waiters: 0 | Delivery: 0 | Manager: 0</p>
    <p id="description"></p>
  </div>

  <div style="text-align: left;">
    <button id="Ramen" style="width:240px; height:240px;">
      <img src="${chashuRamen}" class="icon" style="text-align: center; width:230px; height:240px;" />
    </button>
  </div>

  <div style="text-align: bottom;">
  <button id="Chefs" disabled>
  More Chefs(+0.5/sec, 10 🍜) <img src="${chefimage}" class="icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Waiters" disabled>
  More Waiters(+2/sec, 100 🍜) <img src="${waiterimage}" class="icon" style="text-align: center; width:80px; height:80px;" />  
  </button>
  <button id="Belts" disabled>
  More Conveyer(+50/sec, 1000 🍜) <img src="${beltimage}" class="icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Delivery" disabled>
  More Delivery(+100/sec, 5000 🍜) <img src="${deliveryimage}" class="icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Manager" disabled>
  More Managers(+500/sec, 20000 🍜) <img src="${managerimage}" class="icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  </div>
`;

// Add click handler

const ramenButton = document.getElementById("Ramen")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;

const upgradesElement = document.getElementById("upgrades")!;
const descriptionElement = document.getElementById("description")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button: HTMLButtonElement;
  image: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Chefs",
    cost: 10,
    rate: 1,
    count: 0,
    button: null!,
    image: chefimage,
    description: "A master who knows how to make ramen deliciously fast.",
  },
  {
    name: "Waiters",
    cost: 100,
    rate: 2,
    count: 0,
    button: null!,
    image: waiterimage,
    description: "People are waiting. Get them their ramen faster!",
  },
  {
    name: "Belts",
    cost: 1000,
    rate: 50,
    count: 0,
    button: null!,
    image: beltimage,
    description:
      "Not enough people? Let the conveyor belt do the help for you.",
  },
  {
    name: "Delivery",
    cost: 5000,
    rate: 100,
    count: 0,
    button: null!,
    image: deliveryimage,
    description: "People are too far away? Get them their ramen delivered!",
  },
  {
    name: "Manager",
    cost: 20000,
    rate: 500,
    count: 0,
    button: null!,
    image: managerimage,
    description:
      "We can't keep up! Hire a manager to optimize your ramen shop.",
  },
];

availableItems.forEach((item) => {
  item.button = document.getElementById(item.name) as HTMLButtonElement;
});

// Ramen variables
let ramen: number = 0;
let ramenPerSecond: number = 0;
let displayedRamen: number = 0;

// Upgrades

// Manual click adds ramen
ramenButton.addEventListener("click", () => {
  ramen += 1;
  counterElement.textContent = Math.floor(ramen).toString();
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
});

// Purchase upgrade
availableItems.forEach((item) => {
  item.button.addEventListener("click", () => {
    if (ramen >= item.cost) {
      ramen -= item.cost;
      ramenPerSecond += item.rate;
      item.count += 1;
      item.cost *= 1.5;
      counterElement.textContent = Math.floor(ramen).toString();
      statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
      item.button.innerHTML =
        `More ${item.name} <img src="${item.image}" class="icon" /> (+${item.rate}/sec, ${
          Math.floor(item.cost)
        } 🍜)`;

      upgradesElement.textContent = availableItems.map((item) =>
        `${item.name}: ${item.count}`
      ).join(" | ");

      descriptionElement.textContent = `${item.name}: ${item.description}`;
    }
  });
});

// Automatically adds ramen once per second
setInterval(() => {
  ramen += ramenPerSecond;
  counterElement.textContent = ramen.toString();
  availableItems.forEach((item) => {
    item.button.disabled = ramen < item.cost;
  });
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
}, 1000);

// Smoothly animate the counter
function animate() {
  displayedRamen += (ramen - displayedRamen) * 0.1;
  counterElement.textContent = Math.floor(displayedRamen).toString();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
