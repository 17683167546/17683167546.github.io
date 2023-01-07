//初始化飞机类
class Plane {
  constructor(config) {
    this.width = config.width;
    this.height = config.height;
    this.x = (480 - config.width) / 2;
    this.y = 700 - config.height;
    this.speed = config.speed;
    this.frame = config.frame;
    this.frameLiveIndex = 0;
    this.frameDeathIndex = 0;
    //当前展示图片
    this.img = null;
    this.live = true;
    this.lastTime = new Date().getTime();
    //子弹上次射击时间
    this.lastShootTime = new Date().getTime();
    //子弹射击间隔
    this.shootInterval = 100;
    this.bulletList = new Array();
    this.destory = false;
  }

  judge() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTime > this.speed) {
      if (this.live) {
        this.img =
          this.frame.live[this.frameLiveIndex++ % this.frame.live.length];
      } else {
        this.img = this.frame.death[this.frameDeathIndex++];
        if (this.frameDeathIndex === this.frame.death.length) {
          this.destory = true;
        }
      }
      this.lastTime = currentTime;
    }
  }

  paint(context) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  shoot() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastShootTime > this.shootInterval) {
      //在飞机头部初始化子弹对象
      let bullet = new Bullet(
        BULLET,
        this.x + this.width / 2 - BULLET.width / 2,
        this.y - BULLET.height
      );
      //飞机认领子弹
      this.bulletList.push(bullet);
      //在网页上绘制一个子弹对象
      bullet.paint(context);
      //更新飞机射击时间
      this.lastShootTime = currentTime;
    }
  }

  collide() {
    //将存在标识符live切换为false
    this.live = false;
  }
}
