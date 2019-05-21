import Actor from './Actor';

class Bird extends Actor {
  constructor() {
    super(Actor);
    let birdNum = _.random(0, 2);
    this.birdImg = [
      game.R[`bird${birdNum}_0`],
      game.R[`bird${birdNum}_1`],
      game.R[`bird${birdNum}_2`]
    ]

    this.x = game.canvas.width * (1 - 0.8) - 24; // 小鸟的中心x轴坐标
    this.y = 100; // 小鸟的中心轴坐标
    this.dropf = 0; // 小鸟动画的帧编号
    this.d = 0; // 小鸟的旋转角度
    this.hasEnergy = false; // 能量状态
    this.swingStep = 0;
  }

render() {
  let ctx = game.ctx;
  let img = this.birdImg[this.swingStep];

  ctx.save();
  ctx.translate(this.x, this.y); // 将坐标系拉到要绘制小鸟的位置
  ctx.rotate(this.d);  // 旋转坐标系
  ctx.drawImage(img, -24, -24); // 绘制小鸟
  ctx.restore();
}

update() {
  let dropf = this.dropf;
  let hasEnergy = this.hasEnergy;

  // 翅膀状态
  this.wing();

  this.dropf++

  // 鼠标点击屏幕，会给小鸟传递能量
  if (!hasEnergy) {
    // 如果没有能量，小鸟掉落并旋转
    this.y += (dropf) * 0.5;
    this.d += 0.05;  // 每帧旋转的弧度
  } else {
    // 如果有能量，小鸟先想上飞，再掉落
    this.y -= (17 - dropf) * 0.48; // 每帧上升的距离
    this.d -= 0.02;
    if (dropf == 17) {
      // 如果向上飞了20帧，就让小鸟失去能量重新开始下落
      this.hasEnergy = false;
      // 下落时小鸟帧设置为0,归为下落速度的初始值
      this.dropf = 0;
    }
  }

  // 计算自己的四个碰撞检测值
  this.T = this.y - 12; // 13是图片上面的空隙
  this.R = this.x + 17;
  this.B = this.y + 12;
  this.L = this.x - 17;

  // 验证小鸟自己是否落地
  if (this.B >= game.canvas.height - game.LAND_HEIGHT) {
    game.bird.dropf = 0;
    game.sm.enter(4);
  }
  // 验证小鸟是否要飞出天空
  if (this.y <= 0) {
    this.y = 0;
    this.hasEnergy = false;
    this.dropf = 1;
  }
}

  fly() {
    this.hasEnergy = true;
    // 下落前小鸟帧设置为0,归为上升速度的初始值
    this.dropf = 0;
    this.d = 0;
  }

  wing() {
    game.f % 8 === 0 && this.swingStep++;
    if (this.swingStep > 2) {
      this.swingStep = 0;
    }
  }
}

export default Bird;