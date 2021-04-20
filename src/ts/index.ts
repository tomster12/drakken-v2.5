
// Imports
import "../index.css";
import * as p5 from "p5";
import { HistoryCanvas, historyCanvasFunc } from "./history/HistoryCanvas";
import { GameCanvas, gameCanvasFunc } from "./game/GameCanvas";
import { ChatCanvas, chatCanvasFunc } from "./chat/ChatCanvas";


// Declare variables
let canvasContainer: HTMLElement;
let historyCanvas: HistoryCanvas;
let gameCanvas: GameCanvas;
let chatCanvas: ChatCanvas;


// Initialize canvases
canvasContainer = document.getElementById("canvasContainer");
historyCanvas = new p5(historyCanvasFunc, canvasContainer) as HistoryCanvas;
gameCanvas = new p5(gameCanvasFunc, canvasContainer) as GameCanvas;
chatCanvas = new p5(chatCanvasFunc, canvasContainer) as ChatCanvas;
