
// Imports
import { GameCanvas } from "./GameCanvas";


export default abstract class State {

  // Declare variables
  cv: GameCanvas;
  toPop: boolean;


  constructor(cv: GameCanvas) {
    // Init variables
    this.cv = cv;
  };


  abstract update(): void;

  abstract show(): void;
}