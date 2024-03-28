// numbers to arrow key legend:
// 37 = left
// 38 = up
// 39 = right
// 40 = down

const keyMap = {
  87: 38, // W -> Up
  65: 37, // A -> Left
  83: 40, // S -> Down
  68: 39, // D -> Right
};

// TODO: Add more stratagems and sequences
// Definining the stratagem sequences
// bridge
const stratagemSequences = [
  {
    id: 1,
    name: "HMG Emplacement",
    sequence: [40, 38, 37, 39, 39, 37],
    imageUrl: "images/stratagems/bridge/HMG Emplacement.svg",
  },
  {
    id: 2,
    name: "Orbital EMS Strike",
    sequence: [39, 39, 37, 40],
    imageUrl: "images/stratagems/bridge/Orbital EMS Strike.svg",
  },
  {
    id: 3,
    name: "Orbital Gas Strike",
    sequence: [39, 39, 40, 39],
    imageUrl: "images/stratagems/bridge/Orbital Gas Strike.svg",
  },
  {
    id: 4,
    name: "Orbital Precision Strike",
    sequence: [39, 39, 38],
    imageUrl: "images/stratagems/bridge/Orbital Precision Strike.svg",
  },
  {
    id: 5,
    name: "Orbital Smoke Strike",
    sequence: [39, 39, 40, 38],
    imageUrl: "images/stratagems/bridge/Orbital Smoke Strike.svg",
  },
  {
    id: 6,
    name: "Shield Generator Relay",
    sequence: [40, 40, 37, 39, 37, 39],
    imageUrl: "images/stratagems/bridge/Shield Generator Relay.svg",
  },
  {
    id: 7,
    name: "Tesla Tower",
    sequence: [40, 38, 39, 38, 37, 39],
    imageUrl: "images/stratagems/bridge/Tesla Tower.svg",
  },
  // engineering bay
  {
    id: 8,
    name: "Anti-Personnel Minefield",
    sequence: [39, 39, 37, 38],
    imageUrl: "images/stratagems/engineering bay/Anti-Personnel Minefield.svg",
  },
  {
    id: 9,
    name: "Arc Thrower",
    sequence: [39, 39, 38, 37],
    imageUrl: "images/stratagems/engineering bay/Arc Thrower.svg",
  },
  {
    id: 10,
    name: "Ballistic Shield Backpack",
    sequence: [39, 39, 38, 40],
    imageUrl: "images/stratagems/engineering bay/Ballistic Shield Backpack.svg",
  },
  {
    id: 11,
    name: "Grenade Launcher",
    sequence: [39, 39, 40, 37],
    imageUrl: "images/stratagems/engineering bay/Grenade Launcher.svg",
  },
  {
    id: 12,
    name: "Guard Dog Rover",
    sequence: [39, 39, 40, 38],
    imageUrl: "images/stratagems/engineering bay/Guard Dog Rover.svg",
  },
  {
    id: 13,
    name: "Incendiary Mines",
    sequence: [39, 39, 37],
    imageUrl: "images/stratagems/engineering bay/Incendiary Mines.svg",
  },
  {
    id: 14,
    name: "Laser Cannon",
    sequence: [39, 39, 40, 39],
    imageUrl: "images/stratagems/engineering bay/Laser Cannon.svg",
  },
  {
    id: 15,
    name: "Shield Generator Pack",
    sequence: [39, 39, 38],
    imageUrl: "images/stratagems/engineering bay/Shield Generator Pack.svg",
  },
  {
    id: 16,
    name: "Supply Pack",
    sequence: [39, 39, 37, 39],
    imageUrl: "images/stratagems/engineering bay/Supply Pack.svg",
  },
  // more stratagems can be added here
];

export { stratagemSequences };
