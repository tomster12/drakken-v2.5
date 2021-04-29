
// Imports
import * as p5 from "p5";
import "p5/lib/addons/p5.sound.js";


export default class AssetManager {

  // Declare variables
  public static instance: AssetManager;
  private images: { [name: string]: { path: string, loadedImage: p5.Image } }
  private fonts: { [name: string]: { path: string, loadedFont: p5.Font } }
  private sounds: { [name: string]: { path: string, loadedSound: p5.SoundFile } }


  constructor() {
    // Singleton handling
    if (AssetManager.instance) return;
    AssetManager.instance = this;

    // Init variables
    this.images = {};
    this.fonts = {};
    this.sounds = {};
  }


  async loadDefaults() {
    // Load default assets
    this.addImage("default", "images/pog.jpg");
    this.addFont("default", "fonts/Montserrat-Regular.ttf");
    this.addSound("default", "sounds/sfx/click0.mp3");
    await this.loadAll();
  }


  addImage(name: string, path: string) {
    // Add image to be loaded
    this.images[name] = { path: path, loadedImage: null }
  }


  addFont(name: string, path: string) {
    // Add image to be loaded
    this.fonts[name] = { path: path, loadedFont: null }
  }


  addSound(name: string, path: string) {
    // Add image to be loaded
    this.sounds[name] = { path: path, loadedSound: null }
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

    // Promisify loadSound
    let loadSoundAsync = (cv: p5, path: string) => {
      return new Promise((res, _) => {
        ((cv as any) as p5.SoundFile).loadSound(path, (sound: p5.SoundFile) => res(sound));
      });
    };


    // Load each image
    for (let imageData of Object.entries(this.images)) {
      try {
        var loadedImage = await import("../assets/" + imageData[1].path);
        loadedImage = await loadImageAsync(cv, loadedImage.default);
        imageData[1].loadedImage = loadedImage;

      } catch (e) {
        console.log("Could not load image " + "../assets/" + imageData[1].path);
      }
    }

    // Load each font
    for (let fontData of Object.entries(this.fonts)) {
      try {
        var loadedFont = await import("../assets/" + fontData[1].path);
        loadedFont = await loadFontAsync(cv, loadedFont.default);
        fontData[1].loadedFont = loadedFont;

      } catch (e) {
        console.log("Could not load font " + "../assets/" + fontData[1].path);
      }
    }

    // Load each sound
    for (let soundData of Object.entries(this.sounds)) {
      try {
        var loadedSound = await import("../assets/" + soundData[1].path);
        loadedSound = await loadSoundAsync(cv, loadedSound.default);
        soundData[1].loadedSound = loadedSound;

      } catch (e) {
        console.log("Could not load sound " + "../assets/" + soundData[1].path);
      }
    }
  }


  getImage(name: string): p5.Image {
    // Image does not exist
    if (!this.images.hasOwnProperty(name)) {
      // console.log("Image does not exist");
      return this.getImage("default");
    }

    // Image not loaded
    if (this.images[name].loadedImage == null) {
      // console.log("Image has not loaded");
      return this.getImage("default");
    }

    // Return image
    return this.images[name].loadedImage;
  }


  getFont(name: string): p5.Font {
    // Font does not exist
    if (!this.fonts.hasOwnProperty(name)) {
      // console.log("Font does not exist");
      return this.getFont("default");
    }

    // Font not loaded
    if (this.fonts[name].loadedFont == null) {
      // console.log("Font has not loaded");
      return this.getFont("default");
    }

    // Return font
    return this.fonts[name].loadedFont;
  }


  getSound(name: string): p5.SoundFile {
    // Sound does not exist
    if (!this.sounds.hasOwnProperty(name)) {
      // console.log("Sound does not exist");
      return this.getSound("default");
    }

    // Sound not loaded
    if (this.sounds[name].loadedSound == null) {
      // console.log("Sound has not loaded");
      return this.getSound("default");
    }

    // Return image
    return this.sounds[name].loadedSound;
  }
}
