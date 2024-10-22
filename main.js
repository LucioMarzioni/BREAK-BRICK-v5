import Preload from "./scenes/Preload.js";
import Menu from "./scenes/Menu.js";
import Game from "./scenes/Game.js";
import Gameover from "./scenes/Gameover.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1000,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Menu, Game, Gameover],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
