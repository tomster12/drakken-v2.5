
// Imports
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import Theming from "../utility/Theming";


export default class BottomState extends State {

  constructor(cv: GameCanvas) {
    super(cv);
  }


  update(): void { }


  show(): void {
    this.cv.background(Theming.BACKGROUND);
  }
}
