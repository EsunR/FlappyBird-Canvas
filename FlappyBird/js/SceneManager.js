(function () {
  window.SceneManager = class SceneManager {
    constructor() {
      // 1表示欢迎屏幕，2表示游戏内容，3表示GameOver
      this.sceneNumber = 1;
      this.bindEvent();
      this.tutoerialOpacity = 1;
      this.logoY = -48;
      this.button_playY = game.canvas.height;
      this.button_playX = game.canvas.width / 2 - 52;
      game.bg = new Background()
      game.bird = new Bird();
      game.land = new Land();
    }

    update() {
      switch (this.sceneNumber) {
        case 1:
          if (this.logoY < 150) {
            // lgog的Y值
            this.logoY += 3;
            // button的Y值
            this.button_playY -= 3;
          }
          game.land.update();
          game.bg.update();
          game.bird.wing();
          break;
        case 2:
          game.bg.update();
          game.bird.wing();
          game.land.update();
          // 改变说明文字的透明度
          this.tutoerialOpacity -= 0.03;
          if (this.tutoerialOpacity <= 0) {
            this.tutoerialOpacity = 1;
          }
          break;
        case 3:
          game.bg.update();
          game.bird.update();
          game.land.update();
          for (let i in game.pipeArr) {
            game.pipeArr[i].update();
          }
          break;
        case 4:
          if (game.ctx.globalAlpha != 1) {
            game.ctx.globalAlpha += 0.1;
          }
          game.bird.birdFailFno++;
          if (!game.bird.onTheGround) {
            game.bird.y += game.bird.birdFailFno * 0.5;
          }
          if (game.bird.y >= game.canvas.height - game.LAND_HEIGHT - 24) {
            game.bird.onTheGround = true;
            game.ctx.globalAlpha = 1;
            game.bird.y = game.canvas.height - game.LAND_HEIGHT - 12;
            game.sm.enter(5);
          }
      }
    }



    render() {
      // 根据当前是第几个场景，来决定做什么
      switch (this.sceneNumber) {
        case 1:
          game.bg.render();
          game.land.render();
          game.bird.render();
          // 画LOGO
          game.ctx.drawImage(game.R.logo, game.canvas.width / 2 - 89, this.logoY)
          // 画按钮
          game.ctx.drawImage(game.R.button_play, this.button_playX, this.button_playY)
          // 调整鸟
          game.bird.x = game.canvas.width / 2;
          game.bird.y = game.canvas.height / 2;
          game.bird.d = 0;
          break;
        case 2:
          game.bg.render();
          game.bird.render();
          game.land.render();
          // 画教程小图
          game.ctx.save();
          game.ctx.globalAlpha = this.tutoerialOpacity;
          game.ctx.drawImage(game.R.tutorial, game.canvas.width / 2 - 57, 200);
          game.ctx.restore();
          break;
        case 3:
          game.bg.render();
          game.bird.render();
          game.land.render();
          // 每100帧渲染出一个管子，并将管子放到pipeArr中
          game.f % 100 == 0 && game.pipeArr.push(new Pipe());
          for (let i in game.pipeArr) {
            game.pipeArr[i].render();
          }
          // 打印分数
          var scoreLength = game.score.toString().length;
          for (var i = 0; i < scoreLength; i++) {
            game.ctx.drawImage(game.R['shuzi' + game.score.toString().charAt(i)], game.canvas.width / 2 + 32 * (i - scoreLength / 2), 100);
          }
          break;
        case 4:
          game.bg.render();
          game.land.render();
          // 每100帧渲染出一个管子，并将管子放到pipeArr中
          for (let i in game.pipeArr) {
            game.pipeArr[i].render();
          }
          game.bird.render();
          // 打印分数
          var scoreLength = game.score.toString().length;
          for (var i = 0; i < scoreLength; i++) {
            game.ctx.drawImage(game.R['shuzi' + game.score.toString().charAt(i)], game.canvas.width / 2 + 32 * (i - scoreLength / 2), 100);
          }
          break;
        case 5:
          game.bg.render();
          game.land.render();
          for (let i in game.pipeArr) {
            game.pipeArr[i].render();
          }
          game.bird.render();
          // 打印分数
          var scoreLength = game.score.toString().length;
          for (var i = 0; i < scoreLength; i++) {
            game.ctx.drawImage(game.R['shuzi' + game.score.toString().charAt(i)], game.canvas.width / 2 + 32 * (i - scoreLength / 2), 100);
          }
          // 渲染game over
          game.ctx.drawImage(game.R.text_game_over, game.canvas.width / 2 - 102, 200);
          break;
      }
    }



    // 进入某个场景执行的方法
    enter(number) {
      this.sceneNumber = number;
      switch (this.sceneNumber) {
        case 1:
          // 进入1号场景时应该做的事：将logo放置到顶部让其下落。
          this.logoY = -48;
          this.button_playY = game.canvas.height;
          break;
        case 2:
          game.bird.y = 150;
          game.bird.x = 100;
          this.tutoerialOpacity = 1;
          break;
        case 3:
          game.pipeArr = new Array();
          break;
        case 4:
          game.ctx.globalAlpha = 0;
          game.bird.onTheGround = false;
          game.bird.birdFailFno = 0;
          break;
      }
    }

    // 添加监听
    bindEvent() {
      let clickHandler = (mousex, mousey) => {
        switch (this.sceneNumber) {
          case 1:
            // 判断用户是否点击到了按钮身上
            if (mousex > this.button_playX && mousex < this.button_playX + 104 && mousey > this.button_playY && mousey < this.button_playY + 58) {
              this.enter(2)
            }
            break;
          case 2:
            this.enter(3);
            break;
          case 3:
            game.bird.fly();
            break;
          case 5:
            this.enter(1);
            break;
        }
      }

      game.canvas.addEventListener("click", function (e) {
        clickHandler(e.clientX, e.clientY);
      })

      game.canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
        var finger = e.touches[0];
        clickHandler(finger.clientX, finger.clientY);
      })
    }
  }
})()