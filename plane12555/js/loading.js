//初始化飞机界面加载类
class Loading {
  constructor(config) {
    //图片组
    this.frame = config.frame;
    this.frameIndex = config.frameIndex;
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;
    this.speed = config.speed;
    this.lastTime = new Date().getTime();
  }

  judge() {
    //获取之前时间，获取毫秒，获取当前时间
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTime > this.speed) {
      this.frameIndex++;
      if (this.frameIndex === 5) {
        //更新状态
        state = RUNNING;
      }
      this.lastTime = currentTime;
    }
  }

  paint(context) {
    context.drawImage(
      this.frame[this.frameIndex],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
