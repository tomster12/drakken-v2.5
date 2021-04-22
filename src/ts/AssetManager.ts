
import * as p5 from "p5";


export default class AssetManager {

  // Declare variables
  public static instance: AssetManager;
  private images: { [name: string]: { path: string, loadedImage: p5.Image } }
  private fonts: { [name: string]: { path: string, loadedFont: p5.Font } }


  constructor() {
    // Singleton handling
    if (AssetManager.instance) return;
    AssetManager.instance = this;

    // Init variables
    this.images = {};
    this.fonts = {};
  }


  addImage(name: string, path: string) {
    // Add image to be loaded
    this.images[name] = {
      path: path,
      loadedImage: null
    }
  }


  addFont(name: string, path: string) {
    // Add image to be loaded
    this.fonts[name] = {
      path: path,
      loadedFont: null
    }
  }


  async loadAll() {
    let cv = new p5(() => {});

    // Promisify loadImage
    let loadImageAsync = (cv: p5, path: string) => {
      return new Promise((res, _) => {
        cv.loadImage(path, (font: p5.Image) => res(font));
      });
    };

    // Promisify loadFont
    let loadFontAsync = (cv: p5, path: string) => {
      return new Promise((res, _) => {
        cv.loadFont(path, (font: p5.Font) => res(font));
      });
    };

    // Load each image
    for (let imageData of Object.entries(this.images)) {
      let loadedImage = await import("../assets/" + imageData[1].path);
      loadedImage = await loadImageAsync(cv, loadedImage.default);
      imageData[1].loadedImage = loadedImage;
    }

    // Load each font
    for (let fontData of Object.entries(this.fonts)) {
      let loadedFont = await import("../assets/" + fontData[1].path);
      loadedFont = await loadFontAsync(cv, loadedFont.default);
      fontData[1].loadedFont = loadedFont;
    }
  }


  getImage(name: string): p5.Image {
    // Image does not exist
    if (!this.images.hasOwnProperty(name)) return null;

    // Return image
    return this.images[name].loadedImage;
  }


  getFont(name: string): p5.Font {
    // Image does not exist
    if (!this.fonts.hasOwnProperty(name)) return null;

    // Return image
    return this.fonts[name].loadedFont;
  }
}
