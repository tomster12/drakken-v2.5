
// Imports
import "../css/index.css";
import * as p5 from "p5";
import { HistoryCanvas, historyCanvasFunc } from "./HistoryCanvas";
import { MainCanvas, mainCanvasFunc } from "./MainCanvas";
import { ChatCanvas, chatCanvasFunc } from "./ChatCanvas";

// Declare variables
let canvasContainer: HTMLElement;
let historyCanvas: MainCanvas;
let mainCanvas: MainCanvas;
let chatCanvas: MainCanvas;


// Initialize variables
canvasContainer = document.getElementById("canvasContainer");
historyCanvas = new p5(historyCanvasFunc, canvasContainer) as HistoryCanvas;
mainCanvas = new p5(mainCanvasFunc, canvasContainer) as MainCanvas;
chatCanvas = new p5(chatCanvasFunc, canvasContainer) as ChatCanvas;
