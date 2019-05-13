// 渲染、更新所有的演员和渲染所有的演员
_.each(this.actors, function (actor) {
  actor.update();
  actor.render();
})

// 每40帧渲染一组管子
if (this.f % 100 == 0) {
  this.pipe = new Pipe();
}

// 打印分数
var scoreLength = this.score.toString().length;
for (var i = 0; i < scoreLength; i++) {
  this.ctx.drawImage(this.R['shuzi' + this.score.toString().charAt(i)], this.canvas.width / 2 + 32 * (i - scoreLength / 2), 100);
}