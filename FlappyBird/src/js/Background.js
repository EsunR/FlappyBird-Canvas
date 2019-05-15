import Actor from './Actor'

class Background extends Actor {
  constructor() {
    // 调用超类，自动将演员放到演员列表中
    super(Actor);
    // 随机选一个，是白天还是黑夜
    this.dayOrNight = _.random(0, 1);
    // 自己的图片名字
    this.imageName = (["bg_day", "bg_night"])[this.dayOrNight];
    // 从资源集合R中选择要使用的图片，要调用的图片已经被Game类的R加载完毕了
    this.image = game.R[this.imageName];
    // 位置索引
    this.x = 0;
  }
  // 主循环每帧调用render
  render() {
    // 渲染三张，目的是无缝滚动，当猫腻图的做边框达到0时，就拉回
    game.ctx.drawImage(this.image, this.x, 0, 288, game.canvas.height);
    game.ctx.drawImage(this.image, this.x + 288, 0, 288, game.canvas.height);
    game.ctx.drawImage(this.image, this.x + 288 * 2, 0, 288, game.canvas.height);
  }
  // 主循环每帧调用update  
  update() {
    this.x -= 1;
    if (this.x < -288) {
      this.x = 0;
    }
  }
}

export default Background;