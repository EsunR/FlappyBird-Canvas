import SceneManager from './SceneManager'

class Game {
  constructor(id) {
    // 获取画布
    this.canvas = document.getElementById(id);
    this.init();
    // 设置上下文
    this.ctx = this.canvas.getContext("2d");
    this.RObj = null;
    this.R = {};
    // 帧数编号
    this.f = 0;
    // 演员清单
    this.actors = [];
    // 游戏的速度（前景速度，非背景速度）
    this.SPEED = 2;
    // 地面的高度
    this.LAND_HEIGHT = this.canvas.height * 0.25;
    // 玩家分数
    this.score = 0;

    // 开始加载游戏资源
    this.loadResouces(() => {
      // 游戏开始
      this.start();
      // this.bindEvent();
    });


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
          this.R[k].src = "./img/" + this.RObj[k];
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
    xhr.open('get', './R.json', true);
    xhr.send(null);
  }

  /**
   * 游戏开始
   */
  start() {
    // 场景管理器
    this.sm = new SceneManager();

    // 游戏主循环
    this.timmer = setInterval(() => {
      // 清屏
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 场景管理器的渲染
      this.sm.update();
      this.sm.render();

      // 帧数++
      this.f++;

    }, 20)
  }

  /**
   * 打印帧编号
   */
  printFix() {
    this.ctx.font = "14px 微软雅黑";
    this.ctx.textAlign = "left";
    this.ctx.fillText(this.f, 10, 20);
  }


  /**
   * 初始化画布
   */
  init() {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    if (windowWidth > 450) {
      windowWidth = 450;
    }
    if (windowHeight > 1000) {
      windowHeight = 1000;
    }
    console.log();
    this.canvas.width = windowWidth;
    this.canvas.height = windowHeight;
  }


}

export default Game;