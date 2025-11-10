import chashuRamen from "./chashu-ramen-3d-icon-png-download-9666063.png";
import beltimage from "./conveyor-belt.png";
import deliveryimage from "./delivery-man.png";
import slurp from "./drink-slurp-ahh-sfx-425031.mp3";
import managerimage from "./manager.png";
import backgroundimage from "./ramen-backgound.png";
import chefimage from "./ramen-jiro-rice-soup-menu-png.png";
import waiterimage from "./ramen-waiter.png";
import "./style.css";

document.body.innerHTML = `
  <div 
    style="
      text-align: center; 
      background-image: url('${backgroundimage}');
      background-size: cover; 
      background-repeat: no-repeat; 
      background-position: center; 
      min-height: 100vh;
    "
  >

  <div style="
    text-align: center;
    color: red;
    background-color: yellow;
    border-radius: 20px;
    padding: 20px;
    display: inline-block;
    box-shadow: 0 4px 10px red;
  ">
    <h1>WELCOME TO</h1>
    <h1>RAMEN COUNTER</h1>
    <p>Ramen Counter: <span id="counter">0</span></p>
    <p id="status">0 🍜/sec</p>
    <p id="upgrades">Chefs: 0 | Conveyer Belts: 0 | Waiters: 0 | Delivery: 0 | Manager: 0</p>
    <p id="description"></p>
  </div>

  <div style="text-align: left;">
    <button id="Ramen" style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  ">
      <img src="${chashuRamen}" class="ramen-icon" style="text-align: center; width:230px; height:240px;" />
    </button>
  </div>

  <div style="text-align: bottom;">
  <button id="Chefs" disabled style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  "> 
  More Chefs(+0.5/sec, 10 🍜) <img src="${chefimage}" class="chef-icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Waiters" disabled style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  ">
  More Waiters(+2/sec, 100 🍜) <img src="${waiterimage}" class="waiter-icon" style="text-align: center; width:80px; height:80px;" />  
  </button>
  <button id="Belts" disabled style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  ">
  More Conveyer(+50/sec, 1000 🍜) <img src="${beltimage}" class="belt-icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Delivery" disabled style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  ">
  More Delivery(+100/sec, 5000 🍜) <img src="${deliveryimage}" class="delivery-icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  <button id="Manager" disabled style="   
  color: red;
  background-color: yellow;
  border: 2px solid red;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  ">
  More Managers(+500/sec, 20000 🍜) <img src="${managerimage}" class="manager-icon" style="text-align: center; width:80px; height:80px;" /> 
  </button>
  </div>
`;

// Add click handler --------------------------------------

const ramenButton = document.getElementById("Ramen")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;
const upgradesElement = document.getElementById("upgrades")!;
const descriptionElement = document.getElementById("description")!;

// Ramen variables --------------------------------------
let ramen: number = 0;
let ramenPerSecond: number = 0;
let displayedRamen: number = 0;

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

// Upgrades --------------------------------------

// Manual click adds ramen
ramenButton.addEventListener("click", () => {
  ramen += 1;
  counterElement.textContent = Math.floor(ramen).toString();
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;

  // Play slurp sound
  const audio = new Audio(slurp);
  audio.play();
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

// Automatically adds ramen once per second --------------------------------------
setInterval(() => {
  ramen += ramenPerSecond;
  counterElement.textContent = ramen.toString();
  availableItems.forEach((item) => {
    item.button.disabled = ramen < item.cost;
  });
  statusElement.textContent = `${ramenPerSecond.toFixed(1)} 🍜/sec`;
}, 1000);

// Smoothly animate the counter --------------------------------------
function animate() {
  displayedRamen += (ramen - displayedRamen) * 0.1;
  counterElement.textContent = Math.floor(displayedRamen).toString();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
