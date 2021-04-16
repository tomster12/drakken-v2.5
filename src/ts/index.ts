
// Imports
import "../css/index.css";
import * as p5 from "p5";
import { MainCanvas, mainCanvasFunc } from "./MainCanvas";

// Declare variables
let canvasContainer: HTMLElement;
let mainCanvas: MainCanvas;


// Initialize variables
canvasContainer = document.getElementById("canvasContainer");
mainCanvas = new p5(mainCanvasFunc, canvasContainer) as MainCanvas;