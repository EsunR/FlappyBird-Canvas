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
      // 地面贴图宽度336，高度112
      game.ctx.drawImage(this.image, this.x, game.canvas.height - game.LAND_HEIGHT, game.canvas.width, game.LAND_HEIGHT);

      game.ctx.drawImage(this.image, this.x + game.canvas.width, game.canvas.height - game.LAND_HEIGHT, game.canvas.width, game.LAND_HEIGHT);

      game.ctx.drawImage(this.image, this.x + game.canvas.width * 2, game.canvas.height - game.LAND_HEIGHT, game.canvas.width, game.LAND_HEIGHT);
    }
    主循环每帧调用update
    update() {
      this.x -= game.SPEED;
      if (this.x < -336) {
        this.x = 0;
      }
    }
  }
})()