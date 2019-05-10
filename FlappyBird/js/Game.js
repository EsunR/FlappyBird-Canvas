(function () {
  window.Game = class Game {
    constructor(id) {
      // 获取画布
      this.canvas = document.getElementById(id);
      // 设置上下文
      this.ctx = this.canvas.getContext("2d");
      this.RtextURL = "R.json";
      this.RObj = null;
      this.R = {};
      // 帧数编号
      this.f = 0;
      // 演员清单
      this.actors = [];
      this.loadResouces(() => {
        this.start();
      });
      // 游戏的速度（前景速度，非背景速度）
      this.SPEED = 5;
      // 地面的高度
      this.LAND_HEIGHT = this.canvas.height * 0.25;
    }

    /**
     * 加载资源
     * @param {function} callback 
     */
    loadResouces(callback) {
      // 已经加载好的图片的个数
      let count = 0;
      // Ajax请求图片资源
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          // 转化为一个对象
          this.RObj = JSON.parse(xhr.responseText)
          // 获取图片总数
          let imageAmount = _.size(this.RObj);
          // 遍历这个对象，设置一个相似的图片Image对象的JSON，准备img对象
          for (var k in this.RObj) {
            // 创建Image对象
            this.R[k] = new Image();
            // 发出src请求
            this.R[k].src = "img/" + this.RObj[k];
            // 监听
            this.R[k].onload = () => {
              // 计数器++
              count++;
              this.ctx.clearRect(0, 0, 360, 520);
              this.ctx.font = "30px 微软雅黑";
              this.ctx.textAlign = "center";
              this.ctx.fillText(`正在加载图片(${count}/${imageAmount})`, this.canvas.width / 2, this.canvas.height * (1 - 0.618));
              if (count == imageAmount) {
                // 图片加载完成，开始主循环
                callback();
              }
            }
          }

        }
      }
      xhr.open('get', this.RtextURL, true);
      xhr.send(null);
    }

    /**
     * 游戏开始
     */
    start() {
      // 注册Actor
      // 背景
      this.bg = new Background();
      this.land = new Land();

      // 游戏主循环
      this.timer = setInterval(() => {
        // 清屏
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);

        // 渲染、更新所有的演员和渲染所有的演员
        _.each(this.actors, function (actor) {
          actor.update();
          actor.render();
        })

        // 每40帧渲染一组管子
        if (this.f % 40 == 0) {
          this.pipe = new Pipe();
        }

        // 打印帧编号
        this.printFix();
      }, 40)
    }

    /**
     * 打印帧编号
     */
    printFix() {
      this.f++;
      this.ctx.font = "14px 微软雅黑";
      this.ctx.textAlign = "left";
      this.ctx.fillText(this.f, 10, 20);
    }
  }
})()