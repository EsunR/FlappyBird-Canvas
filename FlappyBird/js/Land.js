(function () {
  window.Land = class Land extends Actor {
    constructor() {
      // 调用超类，自动将演员放到演员列表中
      super(Actor);
      this.image = game.R.land;
      // 位置索引
      this.x = 0;
    }
    // 主循环每帧调用render
    render() {
      game.ctx.drawImage(this.image, this.x, 520 - 112);
      game.ctx.drawImage(this.image, this.x + 336, 520 - 112);
      game.ctx.drawImage(this.image, this.x + 336 * 2, 520 - 112);
    }
    // 主循环每帧调用update  
    update() {
      this.x -= game.SPEED;
      if (this.x < -336) {
        this.x = 0;
      }
    }
  }
})()