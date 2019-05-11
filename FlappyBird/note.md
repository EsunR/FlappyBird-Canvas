# 掉落算法
我们现在要研究一个问题，就是某元素一开始位置是y=100，如果限制变化常数是8，此时第一帧变为y=1e8（变化8），第二帧变为y=124（变化16）。第三帧是y=156（变化32）
![](http://markdown.img.esunr.xyz/20190510210237.png)

```diff
img.onload = function () {
  setInterval(function () {
    ctx.clearRect(0, 0, 600, 600);
    f++;
    ctx.fillText(f, 20, 20);
    ctx.fillText(`isDropDown: ${isDropDown}`, 20, 40);

    if (isDropDown) {
+     dropf++
+     y += dropf * 0.35; // 每帧下落的距离
+     d += 0.07;  // 每帧旋转的弧度
    }

    ctx.save();
    ctx.translate(x, y); // 将坐标系拉到要绘制小鸟的位置
    ctx.rotate(d);  // 旋转坐标系
    ctx.drawImage(img, -24, -24); // 绘制小鸟
    ctx.restore();
  }, 20)
}
```

给界面设置一个 `isEnergy` 的参数，记录小鸟是否拥有能量。当点击屏幕时，小鸟拥有能量，等小鸟上飞一段时间后小鸟失去能量，之后小鸟开始下落。

那么上升的这段距离，与掉落的公式不同，应该为：

```diff
- y += dropf * 0.35;
+ y -= (20 - dropf) * 0.35;
```

`dropf` 为小鸟自身动画的帧编号， `y` 为小鸟在画布上的y轴坐标。当小鸟开始上升，y的值需要线性减小。

当 `drop < 20` 时，`(20 - dropf) * 0.35;` 是一个正数，y越减越小，说明小鸟开始下落。但当 `drop > 20` 时，`(20 - dropf) * 0.35;` 的值是一个负数，y越减越大，说明小鸟又开始下落了，就会产生如下效果：

![](http://markdown.img.esunr.xyz/垃圾箱.gif)

这说明：**小鸟上升了20帧后，开始进行掉落。**

那么我们结合掉落算法与 `hasEnergy` 进行小鸟能量状态的判断，当用户点击Canvas时，小鸟获取能量（hasEnergy == true），之后小鸟上飞一段距离，失去能量（hasEnergy == false），同时进行小鸟头部旋转的调整。

在此要注意，我们要控制 `dropf` 何时归零，因为 `dropf` 控制了每帧小鸟移动的距离，即控制了小鸟的速度，拥有能量和失去能量时，小鸟的速度都需要初始化，即把 `dropf` 归零，我们在以下情况下需要将 `dropf` 归零：

1. 用户点击Canvas时，小鸟获取能量，上升速度初始化
2. 小鸟准备下落时，`hasEnergy` 改为 `false`，同时小鸟需要以初始速度下落。

这部分的代码入下
```js
// ... ...
var dropf = 0;
var hasEnergy = false; // 能量状态
// ... ...

img.onload = function () {
setInterval(function () {
  // 清屏... ...
  
  dropf++
  // 鼠标点击屏幕，会给小鸟传递能量
  if (!hasEnergy) {
    // 如果没有能量，小鸟掉落并旋转
    y += dropf * 0.6;
    d += 0.05;  // 每帧旋转的弧度
  } else {
    // 如果有能量，小鸟先想上飞，再掉落
    y -= (20 - dropf) * 0.35; // 每帧下落的距离
    d -= 0.03;
    if (dropf > 20) {
      // 如果向上飞了20帧，就让小鸟失去能量重新开始下落
      hasEnergy = false;
      // 下落时小鸟帧设置为0,归为下落速度的初始值
      dropf = 0;
    }
  }

  // 绘制小鸟... ...
}, 20)

canvas.addEventListener("click", function () {
  hasEnergy = true;
  // 下落前小鸟帧设置为0,归为上升速度的初始值
  dropf = 0;
  d = 0;
})
```
