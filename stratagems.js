// numbers to arrow key legend:
// 37 = left
// 38 = up
// 39 = right
// 40 = down

// TODO: Add more stratagems and sequences
// Definining the stratagem sequences
// bridge
const stratagemSequences = [
  {
    id: 1,
    name: "HMG Emplacement",
    sequence: [40, 38, 37, 39, 39, 37],
    imageUrl: "images/stratagems/bridge/HMG Emplacement.svg",
    category: "Bridge",
  },
  {
    id: 2,
    name: "Orbital EMS Strike",
    sequence: [39, 39, 37, 40],
    imageUrl: "images/stratagems/bridge/Orbital EMS Strike.svg",
    category: "Bridge",
  },
  {
    id: 3,
    name: "Orbital Gas Strike",
    sequence: [39, 39, 40, 39],
    imageUrl: "images/stratagems/bridge/Orbital Gas Strike.svg",
    category: "Bridge",
  },
  {
    id: 4,
    name: "Orbital Precision Strike",
    sequence: [39, 39, 38],
    imageUrl: "images/stratagems/bridge/Orbital Precision Strike.svg",
    category: "Bridge",
  },
  {
    id: 5,
    name: "Orbital Smoke Strike",
    sequence: [39, 39, 40, 38],
    imageUrl: "images/stratagems/bridge/Orbital Smoke Strike.svg",
    category: "Bridge",
  },
  {
    id: 6,
    name: "Shield Generator Relay",
    sequence: [40, 40, 37, 39, 37, 39],
    imageUrl: "images/stratagems/bridge/Shield Generator Relay.svg",
    category: "Bridge",
  },
  {
    id: 7,
    name: "Tesla Tower",
    sequence: [40, 38, 39, 38, 37, 39],
    imageUrl: "images/stratagems/bridge/Tesla Tower.svg",
    category: "Bridge",
  },
  // engineering bay
  {
    id: 8,
    name: "Anti-Personnel Minefield",
    sequence: [40, 37, 38, 39],
    imageUrl: "images/stratagems/engineering bay/Anti-Personnel Minefield.svg",
    category: "Engineering Bay",
  },
  {
    id: 9,
    name: "Arc Thrower",
    sequence: [40, 39, 40, 38, 37, 37],
    imageUrl: "images/stratagems/engineering bay/Arc Thrower.svg",
    category: "Engineering Bay",
  },
  {
    id: 10,
    name: "Ballistic Shield Backpack",
    sequence: [40, 37, 40, 40, 38, 37],
    imageUrl: "images/stratagems/engineering bay/Ballistic Shield Backpack.svg",
    category: "Engineering Bay",
  },
  {
    id: 11,
    name: "Grenade Launcher",
    sequence: [40, 37, 38, 37, 40],
    imageUrl: "images/stratagems/engineering bay/Grenade Launcher.svg",
    category: "Engineering Bay",
  },
  {
    id: 12,
    name: "Guard Dog Rover",
    sequence: [40, 38, 37, 38, 39, 39],
    imageUrl: "images/stratagems/engineering bay/Guard Dog Rover.svg",
    category: "Engineering Bay",
  },
  {
    id: 13,
    name: "Incendiary Mines",
    sequence: [40, 37, 37, 40],
    imageUrl: "images/stratagems/engineering bay/Incendiary Mines.svg",
    category: "Engineering Bay",
  },
  {
    id: 14,
    name: "Laser Cannon",
    sequence: [40, 37, 40, 38, 37],
    imageUrl: "images/stratagems/engineering bay/Laser Cannon.svg",
    category: "Engineering Bay",
  },
  {
    id: 15,
    name: "Shield Generator Pack",
    sequence: [40, 38, 37, 39, 37, 39],
    imageUrl: "images/stratagems/engineering bay/Shield Generator Pack.svg",
    category: "Engineering Bay",
  },
  {
    id: 16,
    name: "Supply Pack",
    sequence: [40, 37, 40, 38, 38, 40],
    imageUrl: "images/stratagems/engineering bay/Supply Pack.svg",
    category: "Engineering Bay",
  },
  // general stratagems
  {
    id: 17,
    name: "Hellbomb",
    sequence: [40, 38, 37, 40, 38, 39, 40, 38],
    imageUrl: "images/stratagems/general stratagems/Hellbomb.svg",
    category: "General Stratagems",
  },
  {
    id: 18,
    name: "Orbital Illuminiation Flare",
    sequence: [39, 39, 37, 37],
    imageUrl:
      "images/stratagems/general stratagems/Orbital Illumination Flare.svg",
    category: "General Stratagems",
  },
  {
    id: 19,
    name: "Prospecting Drill",
    sequence: [40, 40, 37, 39, 40, 40],
    imageUrl: "images/stratagems/general stratagems/Prospecting Drill.svg",
    category: "General Stratagems",
  },
  {
    id: 20,
    name: "Reinforce",
    sequence: [38, 40, 39, 37, 38],
    imageUrl: "images/stratagems/general stratagems/Reinforce.svg",
    category: "General Stratagems",
  },
  {
    id: 21,
    name: "Resupply",
    sequence: [40, 40, 38, 39],
    imageUrl: "images/stratagems/general stratagems/Resupply.svg",
    category: "General Stratagems",
  },
  {
    id: 22,
    name: "SEAF Artillery",
    sequence: [39, 38, 38, 40],
    imageUrl: "images/stratagems/general stratagems/SEAF Artillery.svg",
    category: "General Stratagems",
  },
  {
    id: 23,
    name: "Seismic Probe",
    sequence: [38, 38, 37, 39, 40, 40],
    imageUrl: "images/stratagems/general stratagems/Seismic Probe.svg",
    category: "General Stratagems",
  },
  {
    id: 24,
    name: "SOS Beacon",
    sequence: [38, 40, 39, 38],
    imageUrl: "images/stratagems/general stratagems/SOS Beacon.svg",
    category: "General Stratagems",
  },
  {
    id: 25,
    name: "Super Earth Flag",
    sequence: [40, 38, 40, 38],
    imageUrl: "images/stratagems/general stratagems/Super Earth Flag.svg",
    category: "General Stratagems",
  },
  {
    id: 26,
    name: "Upload Data",
    sequence: [40, 40, 38, 38, 38],
    imageUrl: "images/stratagems/general stratagems/Upload Data.svg",
    category: "General Stratagems",
  },
  // hangar
  {
    id: 27,
    name: "Eagle 110MM Rocket Pods",
    sequence: [40, 39, 40, 38, 37],
    imageUrl: "images/stratagems/hangar/Eagle 110MM Rocket Pods.svg",
    category: "Hangar",
  },
  {
    id: 28,
    name: "Eagle 500KG Bomb",
    sequence: [40, 39, 40, 38, 39],
    imageUrl: "images/stratagems/hangar/Eagle 500KG Bomb.svg",
    category: "Hangar",
  },
  {
    id: 29,
    name: "Eagle Airstrike",
    sequence: [40, 39, 40, 38, 40],
    imageUrl: "images/stratagems/hangar/Eagle Airstrike.svg",
    category: "Hangar",
  },
  {
    id: 30,
    name: "Eagle Cluster Bomb",
    sequence: [40, 39, 40, 38, 38],
    imageUrl: "images/stratagems/hangar/Eagle Cluster Bomb.svg",
    category: "Hangar",
  },
  {
    id: 31,
    name: "Eagle Napalm Airstrike",
    sequence: [40, 39, 40, 38, 38],
    imageUrl: "images/stratagems/hangar/Eagle Napalm Airstrike.svg",
    category: "Hangar",
  },
  {
    id: 32,
    name: "Eagle Rearm",
    sequence: [40, 39, 40, 38, 37],
    imageUrl: "images/stratagems/hangar/Eagle Rearm.svg",
    category: "Hangar",
  },
  {
    id: 33,
    name: "Eagle Smoke Strike",
    sequence: [40, 39, 40, 38, 39],
    imageUrl: "images/stratagems/hangar/Eagle Smoke Strike.svg",
    category: "Hangar",
  },
  {
    id: 34,
    name: "Eagle Strafing Run",
    sequence: [40, 39, 40, 38, 40],
    imageUrl: "images/stratagems/hangar/Eagle Strafing Run.svg",
    category: "Hangar",
  },
  {
    id: 35,
    name: "Jump Pack",
    sequence: [40, 39, 40, 38, 38],
    imageUrl: "images/stratagems/hangar/Jump Pack.svg",
    category: "Hangar",
  },
  // more stratagems can be added here
];

export { stratagemSequences };
