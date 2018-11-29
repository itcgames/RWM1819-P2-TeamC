'use strict';

class LevelHandler {
  /**
   *
   */
  constructor() {
    this.levels = [];
    this._currentLevelIndex = 0;
  }


  /**
   * Add a level object to the array of levels
   * @param level {Level} the level object to add to the scene
   */
  addLevel(level) {
    if (level) {
      this.levels.push(level);
      if (this._currentLevel === undefined) {
        this._currentLevel = this.levels[0];
      } else {
        for (let i = 0; i < this.levels.length; i++) {
          if (i !== this._currentLevelIndex) {
            this.levels[i].hideLevel();
          }
        }
      }
    }
  }

  /**
   * Remove level from the level arrau
   * @param index
   */
  removeLevel(index) {
    if ( index < this.levels.length && i >=  0) {
      this.levels.splice(index, 1);
      if (index === this._currentLevelIndex) {
        this._currentLevelIndex = 0;
        for (let i = 0; i < this.levels.length; i++) {
          if (i !== this._currentLevelIndex) {
            this.levels[i].hideLevel();
          }
        }
      }
    }
  }

  /**
   * Set the current level index to be that of the passed in index
   * @param index {number} the level index to go to
   */
  goToLevel(index) {
    if ( index < this.levels.length && i >=  0) {
      this._currentLevelIndex = index;
      for (let i = 0; i < this.levels.length; i++) {
        if (i !== this._currentLevelIndex) {
          this.levels[i].hideLevel();
        }
      }
    }
  }

  /**
   * Get the current level object
   * @returns {Level} the current level object the index refers to
   */
  get currentLevel() {
    return this.levels[this._currentLevelIndex];
  }
}