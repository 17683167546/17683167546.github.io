//初始化天空类
class Sky {
  constructor(config) {
    //静态属性
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = -this.height;
    this.speed = config.speed;
    this.lastTime = new Date().getTime();
  }
  //动态方法
  //判断方法，这个时间段天空是否移动
  judge() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastTime > this.speed) {
      this.y1++;
      this.y2++;
      this.lastTime = currentTime;
    }
    if (this.y2 === 0) {
      this.y1 = 0;
      this.y2 = -this.height;
    }
  }

  //绘图方法
  paint(context) {
    /**
     * Image加载图片对象
     * dx 图片开始绘制的左上角横坐标
     * dy 图片开始绘制的左上角纵坐标
     * dwidth 图片在canvas绘制的宽度(缺省值表示的是绘制到整张canvas对象中)
     * dheight 图片在canvas绘制的高度(缺省值表示的是绘制到整张canvas对象中)
     * callback:function 表示回调函数
     * timeout:Number 每隔多长事件会调用该回调函数
     */
    context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
    context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
  }
}
