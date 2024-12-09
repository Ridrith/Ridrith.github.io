const textArea = document.getElementById('textArea');
const character = document.getElementById('character');
const background = document.getElementById('background');
const npcElement = document.createElement('img');
npcElement.className = 'npc';
npcElement.style.display = 'none';
document.getElementById('gameContainer').appendChild(npcElement);

// Game Areas
const areas = [
  {
    background: "assets/background1.jpg",
    description: "A dense forest with towering trees.",
    npc: { type: "friendly", src: "assets/npc-friendly.png", message: "Welcome, traveler!" },
  },
  {
    background: "assets/background2.jpg",
    description: "A quiet village with cobblestone streets.",
    npc: { type: "enemy", src: "assets/npc-enemy.png", health: 50, attackPower: 10 },
  },
];

let currentArea = 0;
let player = { x: 50, y: 50, health: 100, attackPower: 10 };

function updateScene() {
  const area = areas[currentArea];
  background.src = area.background;
  updateText(area.description);

  if (area.npc) {
    npcElement.src = area.npc.src;
    npcElement.style.display = 'block';
    npcElement.style.transform = 'translate(70%, 50%)';
  } else {
    npcElement.style.display = 'none';
  }
}

function move(direction) {
  const step = 10;
  let newX = player.x;
  let newY = player.y;

  if (direction === "left") newX -= step;
  if (direction === "right") newX += step;
  if (direction === "up") newY -= step;
  if (direction === "down") newY += step;

  if (newX >= 0 && newX <= 100) player.x = newX;
  if (newY >= 0 && newY <= 100) player.y = newY;

  updateCharacterPosition();
  checkAreaTransition();
}

function updateCharacterPosition() {
  character.style.transform = `translate(-50%, -50%) translate(${player.x}vw, ${player.y}vh)`;
}

function checkAreaTransition() {
  if (player.x > 90 && currentArea < areas.length - 1) {
    currentArea++;
    player.x = 10;
    updateCharacterPosition();
    updateScene();
  }
}

function attack() {
  const npc = areas[currentArea].npc;
  if (npc && npc.type === "enemy" && npc.health > 0) {
    npc.health -= player.attackPower;
    updateText(`You attacked the enemy. Enemy health: ${npc.health}`);
    if (npc.health <= 0) {
      updateText("Enemy defeated!");
    }
  } else {
    updateText("No enemies to attack.");
  }
}

function interact() {
  const npc = areas[currentArea].npc;
  if (npc && npc.type === "friendly") {
    updateText(npc.message);
  } else if (npc && npc.type === "enemy" && npc.health > 0) {
    updateText("The enemy snarls at you.");
  } else {
    updateText("Nothing to interact with here.");
  }
}

function updateText(message) {
  textArea.innerHTML = message;
}

updateScene();
