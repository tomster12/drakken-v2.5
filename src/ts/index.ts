
// Imports
import "../css/index.css";
import * as p5 from "p5";
import { HistoryCanvas, historyCanvasFunc } from "./History/HistoryCanvas";
import { GameCanvas, gameCanvasFunc } from "./Game/GameCanvas";
import { ChatCanvas, chatCanvasFunc } from "./Chat/ChatCanvas";

// Declare variables
let canvasContainer: HTMLElement;
let historyCanvas: HistoryCanvas;
let gameCanvas: GameCanvas;
let chatCanvas: ChatCanvas;


// Initialize variables
canvasContainer = document.getElementById("canvasContainer");
historyCanvas = new p5(historyCanvasFunc, canvasContainer) as HistoryCanvas;
gameCanvas = new p5(gameCanvasFunc, canvasContainer) as GameCanvas;
chatCanvas = new p5(chatCanvasFunc, canvasContainer) as ChatCanvas;
