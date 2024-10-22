import { EN_US, ES_AR } from "./enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "./enums/status";
import { getTranslations, getPhrase } from "./services/translations";
import keys from "./enums/keys";

export default class Menu extends Phaser.Scene {
  #textSpanish;
  #textEnglish;

  #updatedTextInScene;
  #updatedString = "Siguiente";
  #wasChangedLanguage = TODO;

    constructor() {
      super("main");
      const { Play, Break_Brick } = keys.sceneMenu;
      this.#updatedString = next;
      this.Breack_Brick = Break_Brick;
      this.Play = Play;
    }
    init(){ 
      this.language = language;
    }

    preload(){
    this.load.image("menuimg", "./public/backgroundbrillo.png");
    this.load.image("play", "./public/playb.png");
    }

    create(){   
    this.menuimg = this.add.image(500, 300, "menuimg");
    //this.play = this.add.image(500, 300, "play").setInteractive();



    const buttonSpanish = this.add
      .rectangle(width * 0.1, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(ES_AR);
      });

    this.#textSpanish = this.add
      .text(buttonSpanish.x, buttonSpanish.y, "Español", {
        color: "#000000",
      })
      .setOrigin(0.5);

      const buttonEnglish = this.add
      .rectangle(width * 0.5, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(EN_US);
      });

    this.#textEnglish = this.add
      .text(buttonEnglish.x, buttonEnglish.y, "Inglés", {
        color: "#000000",
      })
      .setOrigin(0.5);


      const buttonUpdate = this.add
      .rectangle(width * 0.5, height * 0.75, 150, 75, 0x44d27e)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.scene.start("game", { language: this.language });
      });

    this.#updatedTextInScene = this.add
      .text(buttonUpdate.x, buttonUpdate.y, getPhrase(this.#updatedString), {
        color: "#000000",
      })
      .setOrigin(0.5);

      this.helloText = this.add.text(
        width * 0.5,
        height * 0.3,
        getPhrase(this.Breack_Brick),
        {
          color: "#ffffff",
        }
      );
  
      this.howAreUText = this.add.text(
        width * 0.5,
        height * 0.45,
        getPhrase(this.Play),
        {
          color: "#ffffff",
        })
  
    
    this.input.on('gameobjectover', (pointer, gameObject) =>
      {

          gameObject.setScale(1.1)

      });

      this.input.on('gameobjectout', (pointer, gameObject) =>
      {

          gameObject.setScale(1);

      });
    //this.play.setInteractive();
    //this.play.on("pointerdown", () =>{
    //  this.scene.start("Game");
    //})
    }

    update () {
      if(this.#wasChangedLanguage === FETCHED){
        this.#wasChangedLanguage = READY;
        this.#updatedTextInScene.setText(getPhrase(this.#updatedString));
        this.helloText.setText(getPhrase(this.Break_Brick));
        this.howAreUText.setText(getPhrase(this.Play));
       }
}   

    updateWasChangedLanguage = () => {
      this.#wasChangedLanguage = FETCHED;
      };

    async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
    }
}