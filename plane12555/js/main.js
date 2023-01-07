//主程序代码
//画笔绘制背景
const canvas = document.querySelector("#canvas");
//初始化2d画笔
const context = canvas.getContext("2d");

//初始化天空实例
const sky = new Sky(SKY);

//初始化一个飞机界面加载实例
const loading = new Loading(LOADING);

//初始化飞机状态 飞机死亡次数会变
let plane = new Plane(PLANE);

//state表示游戏状态，游戏进入不同状态，会渲染不同的内容
let state = START;

//为canvas绑定点击事件，且如果是START状态时，要修改成STARTTING状态
canvas.addEventListener("click", () => {
  if (state === START) {
    state = STARTTING;
  }
});

//飞机移动效果，为canvas绑定鼠标移动事件
canvas.addEventListener("mousemove", (e) => {
  let x = e.offsetX;
  let y = e.offsetY;
  plane.x = x - plane.width / 2;
  plane.y = y - plane.height / 2;
});

//canvas绑定鼠标移出暂停 RUNNING => PAUSE
canvas.addEventListener("mouseleave", () => {
  if (state === RUNNING) {
    state = PAUSE;
  }
});

//canvas绑定鼠标移入继续 PAUSE => RUNNING
canvas.addEventListener("mouseenter", () => {
  if (state === PAUSE) {
    state = RUNNING;
  }
});

//该变量中存在所有敌机实例
let enemies = new Array();
//敌机产生的速率
let ENEMY_CREATE_INTERVAL = 800;
let ENEMY_LASTTIME = new Date().getTime();
//分数与血量
let score = 0;
let life = 3;

//全局函数判断所有的子弹组件/敌人
function judgeComponent() {
  for (let i = 0; i < plane.bulletList.length; i++) {
    plane.bulletList[i].move();
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
  }
}

//全局函数绘制所有子弹/敌人 绘制分数score跟玩家血量life面板
function paintComponent() {
  for (let i = 0; i < plane.bulletList.length; i++) {
    plane.bulletList[i].paint(context);
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].paint(context);
  }
  //绘制score&life
  context.font = "20px 微软雅黑";
  context.fliStyle = "red";
  context.textAlign = "left";
  context.fillText("score:" + score, 10, 20);
  context.textAlign = "right";
  context.fillText("life:" + life, 480 - 10, 20);

  //重置代码 画笔重置为黑色 左对齐
  context.fliStyle = "black";
  context.textAlign = "left";
}

//全局函数销毁所有子弹/敌人
function deletComponent() {
  if (plane.destory) {
    //进入判定首先生命减一
    life--;
    plane.destory = false;
    if (life === 0) {
      //游戏结束，进入第四个状态
      state = END;
    } else {
      //死亡一次之后重新获取飞机
      plane = new Plane(PLANE);
    }
  }
  for (let i = 0; i < plane.bulletList.length; i++) {
    //判断有无飞出边界或者碰撞敌机
    if (plane.bulletList[i].outOfBounds() || plane.bulletList[i].destory) {
      plane.bulletList.splice(i, 1);
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    //如果敌机处于待销毁阶段
    if (enemies[i].outOfBounds() || enemies[i].destory) {
      enemies.splice(i, 1);
    }
  }
}

//全局函数隔一段时间初始化一架敌机
function createComponent() {
  const currentTime = new Date().getTime();
  if (currentTime - ENEMY_LASTTIME >= ENEMY_CREATE_INTERVAL) {
    //当时间满足的时候该实例化一架飞机
    //创建随机数，概率生成小中大飞机
    let num = Math.floor(Math.random() * 100);
    if (num < 60) {
      //产生一架小飞机
      enemies.push(new Enemy(E1));
    } else if (num < 90 && num > 60) {
      //产生一架中飞机
      enemies.push(new Enemy(E2));
    } else {
      //产生一架大飞机
      enemies.push(new Enemy(E3));
    }
    //更新时间
    ENEMY_LASTTIME = currentTime;
  }
}

//碰撞检测函数
function checkHit() {
  //遍历敌机
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].hit(plane)) {
      //传参为真表示玩家与敌机发生碰撞
      enemies[i].collide();
      plane.collide();
    }
    //遍历所有的子弹
    for (let j = 0; j < plane.bulletList.length; j++) {
      //用第i架飞机和第j颗子弹做碰撞检测，返回一个布尔值
      if (enemies[i].hit(plane.bulletList[j])) {
        enemies[i].collide();
        plane.bulletList[j].collide();
      }
    }
  }
}

/**加载图片
 *当图片加载完毕再绘制图片
 */
bg.addEventListener("load", () => {
  //保证页面刷新率
  setInterval(() => {
    switch (state) {
      //初始时
      case START:
        //渲染天空
        sky.judge();
        sky.paint(context);
        //渲染飞机大战LOGO
        let logoW = copyright.naturalWidth / 2;
        let logoH = copyright.naturalHeight / 2;
        let logoX = (480 - logoW) / 2;
        let logoY = (700 - logoH) / 2;
        context.drawImage(copyright, logoX, logoY, logoW, logoH);
        break;
      //开始前
      case STARTTING:
        //渲染天空
        sky.judge();
        sky.paint(context);
        //渲染飞机加载 loading
        loading.judge();
        loading.paint(context);
        break;
      case RUNNING:
        //渲染天空
        sky.judge();
        sky.paint(context);
        //渲染我方飞机
        plane.judge();
        plane.paint(context);
        //渲染敌机
        createComponent();
        //渲染子弹
        plane.shoot();
        judgeComponent();
        deletComponent();
        paintComponent();
        //碰撞检测
        checkHit();
        break;
      case PAUSE:
        //渲染暂停图标
        let pause_X = (480 - pause.naturalWidth) / 2;
        let pause_Y = (700 - pause.naturalHeight) / 2;
        context.drawImage(pause, pause_X, pause_Y);
        break;
      case END:
        //渲染结束图标
        //为canvas设置字体与大小
        context.font = "bold 24px 微软雅黑";
        //fillText填充文本与对齐
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("GAME_OVER", 480 / 2, 700 / 2);
        break;
    }
  }, 10);
});
