'use strict';

// this.obSq = new ObstacleSquare(300, 300, this.b2dWorld, this.MyAssetManager);
// this.obRe = new ObstacleRect(700, 200, this.b2dWorld, this.MyAssetManager);
// this.obCi = new ObstacleCircle(500, 100, this.b2dWorld, this.MyAssetManager);
// this.obRo = new ObstacleRotor(100, 400, this.b2dWorld, this.MyAssetManager);


class Level {
  constructor() {
    this.obstacles = new Map();
    this.obstacles.set("squareObstacles", []);
    this.obstacles.set("rectangleObstacles", []);
    this.obstacles.set("circleObstacles", []);
    this.obstacles.set("rotatingObstacles", []);
    this.obstacles.set("boundaryObstacles", []);
  }

  /**
   * Load the level data
   * @param filepath {string} filepath to the json file
   */
  loadLevel(filepath) {

  }

  hideLevel() {
    this.obstacles.forEach((obsArray) => {
      obsArray.forEach((obs) => {
        obs.image.setActive(false);
      });
    });
  }

  update() {

  }
}
