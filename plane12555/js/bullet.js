//初始化子弹类
class Bullet {
  constructor(config, x, y) {
    this.img = config.img;
    this.width = config.width;
    this.height = config.height;
    this.x = x;
    this.y = y;
    this.destory = false;
  }
  //移动子弹
  move() {
    this.y -= 2;
  }
  //子弹绘制方法
  paint(context) {
    context.drawImage(this.img, this.x, this.y);
  }
  //布尔值判断子弹飞出
  outOfBounds() {
    this.y < -this.height;
  }

  collide() {
    //让子弹变成可销毁状态
    this.destory = true;
  }
}
