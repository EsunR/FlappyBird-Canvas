(function () {
  window.SceneManager = class SceneManager {
    constructor() {
      // 1表示欢迎屏幕，2表示游戏内容，3表示GameOver
      this.sceneNumber = 1;
      game.bg = new Background()
      game.bird = new Bird();
      this.logoY = -48;
    }

    update() {
      switch (this.sceneNumber) {
        case 1:
          if (this.logoY < 100) {
            this.logoY += 3;
          }
          break;
      }
    }

    render() {
      // 根据当前是第几个场景，来决定做什么
      switch (this.sceneNumber) {
        case 1:
          game.bg.render();
          game.bird.render();
          game.ctx.drawImage(game.R.logo, game.canvas.width / 2 - 89, this.logoY)
          break;
      }
    }

    // 进入某个场景执行的方法
    enter(number) {
      this.sceneNumber = number;
      switch (this.sceneNumber) {
        case 1:
          // 进入1号场景时应该做的事：将logo放置到顶部让其下落。
          this.logoY = -48;
          break;
      }
    }
  }
})()