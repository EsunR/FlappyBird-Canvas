(function () {
  window.Pipe = class Pipe extends Actor {
    constructor() {
      // 调用超类，自动将演员放到演员列表中
      super(Actor);
      this.image1 = game.R.pipe_down;
      this.image2 = game.R.pipe_up;
      // 两个管子之间的开口
      this.kaikou = 120;
      // 上管子的高度
      this.height = _.random(40, game.canvas.height - game.LAND_HEIGHT - this.kaikou - 40);
      this.x = game.canvas.width; // 320是图片元素的高度
      // 当前小鸟是否已经通过管子
      this.alreadPass = false;
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
    // 主循环每帧调用update
    update() {
      // 碰撞检测，检查自己有没有撞到小鸟
      if (game.bird.R > this.x && game.bird.L < this.x + 52) {
        if (game.bird.T < this.height || game.bird.B > this.height + this.kaikou) {
          // 小鸟死亡进入场景4
          game.sm.enter(4);
        }
      }

      this.x -= game.SPEED;

      // 如果小鸟通过管子就加分
      if (game.bird.L > this.x + 52 && !this.alreadPass) {
        game.score++;
        this.alreadPass = true;
      }

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