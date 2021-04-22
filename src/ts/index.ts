
// Imports
import "../index.css";
import * as p5 from "p5";
import AssetManager from "./AssetManager";
import { HistoryCanvas, historyCanvasFunc } from "./history/HistoryCanvas";
import { GameCanvas, gameCanvasFunc } from "./game/GameCanvas";
import { ChatCanvas, chatCanvasFunc } from "./chat/ChatCanvas";


// Declare variables
let canvasContainer: HTMLElement;
let historyCanvas: HistoryCanvas;
let gameCanvas: GameCanvas;
let chatCanvas: ChatCanvas;
let assetManager: AssetManager;


(async () => {
  // Initialize asset manager
  assetManager = new AssetManager();
  assetManager.addImage("pog", "pog.jpg");
  assetManager.addFont("main", "Montserrat-Regular.ttf");
  await assetManager.loadAll();


  // Initialize canvases
  canvasContainer = document.getElementById("canvasContainer");
  historyCanvas = new p5(historyCanvasFunc, canvasContainer) as HistoryCanvas;
  gameCanvas = new p5(gameCanvasFunc, canvasContainer) as GameCanvas;
  chatCanvas = new p5(chatCanvasFunc, canvasContainer) as ChatCanvas;
  historyCanvas.element = canvasContainer;
  gameCanvas.element = canvasContainer;
  chatCanvas.element = canvasContainer;
})();
