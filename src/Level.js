'use strict';

// this.obSq = new ObstacleSquare(300, 300, this.b2dWorld, this.MyAssetManager);
// this.obRe = new ObstacleRect(700, 200, this.b2dWorld, this.MyAssetManager);
// this.obCi = new ObstacleCircle(500, 100, this.b2dWorld, this.MyAssetManager);
// this.obRo = new ObstacleRotor(100, 400, this.b2dWorld, this.MyAssetManager);


class Level {
  constructor(filepath) {
    this.filepath = filepath;
    this.obstacles = new Map();
    this.obstacles.set("squareObstacles", []);
    this.obstacles.set("rectangleObstacles", []);
    this.obstacles.set("circleObstacles", []);
    this.obstacles.set("rotatingObstacles", []);
    this.obstacles.set("boundaryObstacles", []);
  }

  /**
   * Load the level data
   * @param _filepath {string} filepath to the json file
   */
  loadLevel() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function requestListener(level) {
      level.data = JSON.parse(this.responseText);
      Object.keys(level.data.obstacles).forEach((key) => {
       let list = level.obstacles.get(key);
       if (key === "squareObstacles") {
         level.data.obstacles[key].forEach((obs) => {
           console.log(obs);
           list.push(new ObstacleSquare(obs.x, obs.y,
               obs.rotation,
               gameNs.game.b2dWorld,
               gameNs.game.MyAssetManager,
               obs.sprite));
         });
       } else if (key === "rectangleObstacles") {
         level.data.obstacles[key].forEach((obs) => {
           console.log(obs);
           list.push(new ObstacleRect(obs.x, obs.y,
               obs.rotation,
               gameNs.game.b2dWorld,
               gameNs.game.MyAssetManager,
               obs.sprite));
         });
       } else if (key === "circleObstacles") {
         level.data.obstacles[key].forEach((obs) => {
           console.log(obs);
           list.push(new ObstacleCircle(obs.x, obs.y,
               gameNs.game.b2dWorld,
               gameNs.game.MyAssetManager,
               obs.sprite));
         });
       } else if (key === "rotatingObstacles") {
         level.data.obstacles[key].forEach((obs) => {
           console.log(obs);
           list.push(new ObstacleRotor(obs.x, obs.y,
               gameNs.game.b2dWorld,
               gameNs.game.MyAssetManager,
               obs.sprite));
         });
       } else if (key === "boundaryObstacles") {
         level.data.obstacles[key].forEach((obs) => {
           console.log(obs);
           list.push(new BoundaryRect(obs.x, obs.y,
               obs.vertical,
               gameNs.game.b2dWorld,
               gameNs.game.MyAssetManager,
               obs.sprite));
         });
       }
     });
     level.showLevel();
    }.bind(request, this));
    request.open("GET", this.filepath);
    request.send();
  }

  hideLevel() {
    this.obstacles.forEach((obsArray) => {
      obsArray.forEach((obs) => {
        obs.image.setActive(false);
      });
    });
  }

  showLevel() {
    this.obstacles.forEach((obsArray) => {
      obsArray.forEach((obs) => {
        obs.image.setActive(true);
      });
    });
  }

  update() {
    this.obstacles.get("rotatingObstacles").forEach((obs) => {
      obs.updateSprite();
    });
  }
}
