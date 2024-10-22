import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "./services/translations";

export default class Preload extends Phaser.Scene {
    #language;

    constructor() {
        super('preload');
    }

    preload(){
        this.#language = getLanguageConfig();
        alert(this.#language)
    }

    create(){
        getTranslations(
            this.#language,
            () => this.scene.start('Menu', { language: this.#language }),
        );
    }
}