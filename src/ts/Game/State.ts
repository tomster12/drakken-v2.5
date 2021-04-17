
import { GameCanvas } from "./GameCanvas";


export default abstract class State {

  cv: GameCanvas;
  toPop: boolean;


  constructor(cv: GameCanvas) {
    this.cv = cv;
  };


  abstract draw(): void;
}