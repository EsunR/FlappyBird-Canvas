class Observe {
  constructor(pipe) {
    this.pipe = pipe
  }
  check() {
    // 碰撞检测，检查管子与小鸟是否发生触碰
    if (game.bird.R > this.pipe.x && game.bird.L < this.pipe.x + 52) {
      if (game.bird.T < this.pipe.height || game.bird.B > this.pipe.height + this.pipe.kaikou) {
        // 小鸟死亡进入场景4
        game.sm.enter(4);
      }
    }
  }
}

export default Observe;