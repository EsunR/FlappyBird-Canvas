(function () {
  window.Pipe = class Pipe extends Actor {
    constructor() {
      // 调用超类，自动将演员放到演员列表中
      super(Actor);
      this.image1 = game.R.pipe_down;
      this.image2 = game.R.pipe_up;
      // 上管子的高度
      this.height = _.random(20, 290);
      // 两个管子之间的开口
      this.kaikou = 100;
      this.x = game.canvas.width; // 320是图片元素的高度
    }
    render() {
      game.ctx.drawImage(
        this.image1,
        // 切片坐标、切片宽高
        0, 320 - this.height, 52, this.height,
        // 画布坐标，画布宽高
        this.x, 0, 52, this.height
      );
      game.ctx.drawImage(
        this.image2,
        0, 0, 52, game.canvas.height - game.LAND_HEIGHT - this.kaikou - this.height,
        this.x, this.height + this.kaikou, 52, game.canvas.height - game.LAND_HEIGHT - this.kaikou - this.height
      );
    }
    主循环每帧调用update  
    update() {
      this.x -= game.SPEED;
      // 如果管子出屏幕就删除自己
      if (this.x < -52) {
        this.die();
      }
    }
    die() {
      game.actors = _.without(game.actors, this);
    }
  }
})()