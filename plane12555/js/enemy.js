//初始化敌人类
class Enemy {
  constructor(config) {
    //敌机类型
    this.type = config.type;
    //敌机宽度
    this.width = config.width;
    //敌机高度
    this.height = config.height;
    //敌机初始化位置
    this.x = Math.floor(Math.random() * (480 - config.width));
    this.y = -config.height;
    //敌机生命
    this.life = config.life;
    //敌机分数
    this.score = config.score;
    //敌机图片库
    this.frame = config.frame;
    //此时此刻展示图片
    this.img = this.frame.live[0];
    //存活标识
    this.live = true;
    //敌机速度
    this.speed =
      Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) +
      config.maxSpeed;
    //最后时间标识,在这个时间段不变，过了时间开始变化
    this.lastTime = new Date().getTime();
    //死亡下标
    this.deathIndex = 0;
    //确认清除
    this.destory = false;
  }
  //判定是否需要渲染跟移动
  move() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTime >= this.speed) {
      if (this.live) {
        this.img = this.frame.live[0];
        this.y++;
      } else {
        this.img = this.frame.death[this.deathIndex++];
        //如果死亡动画播放完毕，立即销毁
        if (this.deathIndex === this.frame.death.length) {
          this.destory = true;
        }
      }
      //更新时间
      this.lastTime = currentTime;
    }
  }
  //渲染敌机
  paint(context) {
    context.drawImage(this.img, this.x, this.y);
  }
  //检测敌机是否碰撞到其他物体(子弹跟玩家飞机)
  //敌机 e
  //子弹 o
  hit(o) {
    //其他物体的左边
    let ol = o.x;
    //其他物体的右边
    let or = o.x + o.width;
    //其他物体的顶边
    let ot = o.y;
    //其他物体的底边
    let ob = o.y + o.height;
    //敌机的左边
    let el = this.x;
    //敌机的右边
    let er = this.x + this.width;
    //敌机的顶边
    let et = this.y;
    //敌机的底边
    let eb = this.y + this.height;
    //判断是否碰到
    if (ol > er || or < el || ot > eb || ob < et) {
      //没碰到
      return false;
    } else {
      //碰到了
      return true;
    }
  }
  //子弹碰撞之后检测血量
  collide() {
    this.life--;
    if (this.life === 0) {
      //1.将live标识为死亡状态
      //2.播放死亡动画
      //3.动画结束清除该架飞机
      this.live = false;
      //获得敌机分数
      score += this.score;
    }
  }
  //敌机飞出边界删除
  outOfBounds() {
    if (this.y > 700) {
      return true;
    }
  }
}
