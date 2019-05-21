import SceneManager from "./SceneManager";

class FramesCounter {
  constructor(game) {
    this.game = game
  }
  start() {
    // 场景管理器
    this.game.sm = new SceneManager;

    // 游戏主循环
    this.timmer = setInterval(() => {
      // 清屏
      this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

      // 场景管理器的渲染
      this.game.sm.update();
      this.game.sm.render();

      // 帧数++
      this.game.f++;

    }, 20)
  }
}

export default FramesCounter;