
// Imports
import AssetManager from "./AssetManager";

// Sound typings
type SoundType = "sfx" | "music";
type SoundOption = SoundType | "global";


export default class SoundManager {

  // Declare variables
  public static instance: SoundManager;
  am: AssetManager;
  sounds: { [typ in SoundType]: string[] };
  volumes: { [typ in SoundOption]: { pct: number, range: [number, number]} };


  constructor() {
    // Singleton handling
    if (SoundManager.instance) return;
    SoundManager.instance = this;

    // Get asset manager instance
    if (!AssetManager.instance) return;
    this.am = AssetManager.instance;

    // Initialize variables
    this.sounds = { sfx: [], music: [] };
    this.volumes = {
      "global": { pct: 0.5, range: [0.0, 2.0]},
      "sfx": { pct: 0.5, range: [0.0, 2.0]},
      "music": { pct: 0.0, range: [0.0, 0.8]} };
  }


  updateVolume(name: SoundOption) {
    // Loop over and get sound for each relevant type
    for (let type of Object.entries(this.sounds)) {
      if (name == "global" || name == type[0]) {

        let globalVolume = this.getVolumeDb("global");
        let typeVolume = this.getVolumeDb(type[0] as SoundType);
        let vol = globalVolume * typeVolume;

        // Set each sound of this type to be the correct volume
        for (let name of type[1]) {
          let sound = this.am.getSound(type[0] + "/" + name);
          sound.setVolume(vol);
        }
      }
    }
  }


  addSound(typ: SoundType, name: string, path: string) {
    this.sounds[typ].push(name);
    this.am.addSound(typ + "/" + name, path);
  }



  playSound(typ: SoundType, name: string) {
    // Play a specific sound
    let sound = this.am.getSound(typ + "/" + name);
    sound.play();
  }


  loopSound(typ: SoundType, name: string) {
    // Play a specific sound
    let sound = this.am.getSound(typ + "/" + name);
    sound.loop();
  }


  setVolumePct(typ: SoundOption, pct: number) {
    // Set volume percent
    this.volumes[typ].pct = pct;
    this.updateVolume(typ);
  }


  getVolumePct(typ: SoundOption) {
    // Get volume of type between range of type
    let pct = this.volumes[typ].pct;
    return pct;
  }


  getVolumeDb(typ: SoundOption) {
    // Get volume of type between range of type
    let ll = this.volumes[typ].range[0];
    let ul = this.volumes[typ].range[1];
    let db = ll + this.volumes[typ].pct * (ul - ll);
    return db;
  }
}
