class Actor {
  constructor() {
    // 将实例化的演员放到演员队列中
    game.actors.push(this);
  }
  update() {

  }
  render() {
    throw new Error("必须重写Render方法")
  }
}

export default Actor;