
// Imports
import "../index.css";
import tokenData from "../assets/tokenData";
import * as p5 from "p5";
import AssetManager from "./AssetManager";
import SoundManager from "./SoundManager";
import { HistoryCanvas, historyCanvasFunc } from "./history/HistoryCanvas";
import LoadingState from "./game/LoadingState";
import MenuState from "./game/MenuState";
import { GameCanvas, gameCanvasFunc } from "./game/GameCanvas";
import { ChatCanvas, chatCanvasFunc } from "./chat/ChatCanvas";


// Declare variables
let canvasContainer: HTMLElement;
let historyCanvas: HistoryCanvas;
let gameCanvas: GameCanvas;
let chatCanvas: ChatCanvas;
let assetManager: AssetManager;
let soundManager: SoundManager;


(async () => {
  // Initialize managers and load defaults
  assetManager = new AssetManager();
  soundManager = new SoundManager();
  await assetManager.loadDefaults();


  // Initialize canvases
  canvasContainer = document.getElementById("canvasContainer");
  historyCanvas = new p5(historyCanvasFunc, canvasContainer) as HistoryCanvas;
  gameCanvas = new p5(gameCanvasFunc, canvasContainer) as GameCanvas;
  chatCanvas = new p5(chatCanvasFunc, canvasContainer) as ChatCanvas;
  historyCanvas.element = canvasContainer;
  gameCanvas.element = canvasContainer;
  chatCanvas.element = canvasContainer;


  // #region - Add assets

  // Add fonts
  assetManager.addFont("main", "fonts/Montserrat-Regular.ttf");
  await assetManager.loadAll();


  // Add token images
  for (let rarity of Object.entries(tokenData.tokens.neutral)) {
    for (let token of rarity[1]) {
      let name = "neutral/" + rarity[0] + "/" + token.name;
      let path = "images/tokens/neutral/" + rarity[0] + "/" + token.name.toLowerCase().replace(" ", "") + ".png";
      assetManager.addImage(name, path);
    }
  }
  for (let clss of Object.entries(tokenData.tokens.classes)) {
    for (let rarity of Object.entries(clss[1])) {
      for (let token of rarity[1]) {
        let name = "class/" + clss[0] + "/" + rarity[0] + "/" + token.name;
        let path = "images/tokens/class/" + clss[0] + "/" + rarity[0] + "/" + token.name.toLowerCase().replace(" ", "") + ".png";
        assetManager.addImage(name, path);
      }
    }
  }


  // Add sounds
  soundManager.addSound("sfx", "click0", "sounds/sfx/click0.mp3");
  soundManager.addSound("sfx", "click1", "sounds/sfx/click1.mp3");
  soundManager.addSound("sfx", "click2", "sounds/sfx/click2.mp3");
  soundManager.addSound("music", "main", "sounds/music/lofiMusic.mp3");

  // #endregion


  // Use loadState to load assets then go to menu
  gameCanvas.states.push(new LoadingState(
    gameCanvas,
    async () => {
      console.log("Loading assets...");
      await assetManager.loadAll();
      soundManager.updateVolume("global");
    },
    () => {
      console.log("Assets loaded.");
      gameCanvas.states.push(new MenuState(gameCanvas));
    }
  ));
})();
