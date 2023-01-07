//配置项文件
//定义游戏的状态
//开始
const START = 0;
//开始时
const STARTTING = 1;
//运行时
const RUNNING = 2;
//暂停时
const PAUSE = 3;
//结束时
const END = 4;

//创建一个配置文件
const IMAGES = {
  b: "./images/bullet1.png",
  bg: "./images/background.png",
  copyright: "./images/logo.png",
  pause: "./images/pause.png",
  loading_frame: [
    "./images/loadfour.png",
    "./images/loadone.png",
    "./images/loadtwo.png",
    "./images/loadthree.png",
    "./images/loadfour.png",
    "./images/loadfour.png",
  ],
  plane_frame_live: ["./images/plane1.png", "./images/plane2.png"],
  plane_frame_death: [
    "./images/plane01.png",
    "./images/plane02.png",
    "./images/plane03.png",
    "./images/plane04.png",
  ],
  e1_live: ["./images/enemy1.png"],
  e1_death: [
    "./images/enemy11.png",
    "./images/enemy12.png",
    "./images/enemy13.png",
    "./images/enemy14.png",
  ],
  e2_live: ["./images/enemy2.png"],
  e2_death: [
    "./images/enemy21.png",
    "./images/enemy22.png",
    "./images/enemy23.png",
    "./images/enemy23.png",
    "./images/enemy24.png",
    "./images/enemy25.png",
  ],
  e3_live: ["./images/enemy31.png", "./images/enemy32.png"],
  e3_death: [
    "./images/enemy300.png",
    "./images/enemy301.png",
    "./images/enemy302.png",
    "./images/enemy303.png",
    "./images/enemy304.png",
    "./images/enemy305.png",
    "./images/enemy306.png",
  ],
};

/**
 * 该方法用于加载初始化一张图片
 * @param {String | Array} src 图片路径
 * @returns {Image} 根据路径地址生成图片
 */
function createImage(src) {
  let img;
  if (typeof src === "string") {
    img = new Image();
    img.src = src;
  } else {
    img = new Array();
    for (let i = 0; i < src.length; i++) {
      img[i] = new Image();
      img[i].src = src[i];
    }
  }
  return img;
}

// 初始化子弹图片
const b = createImage(IMAGES.b);
//初始化背景图
const bg = createImage(IMAGES.bg);
//初始化图片LOGO
const copyright = createImage(IMAGES.copyright);
//初始化暂停图片
const pause = createImage(IMAGES.pause);
//初始化飞机大战加载图
const loading_frame = createImage(IMAGES.loading_frame);
//玩家飞机的所有图片
const plane_frame = {
  live: createImage(IMAGES.plane_frame_live),
  death: createImage(IMAGES.plane_frame_death),
};
//小型飞机所有图片
const e1 = {
  live: createImage(IMAGES.e1_live),
  death: createImage(IMAGES.e1_death),
};
//中型飞机所有图片
const e2 = {
  live: createImage(IMAGES.e2_live),
  death: createImage(IMAGES.e2_death),
};
//大型飞机所有图片
const e3 = {
  live: createImage(IMAGES.e3_live),
  death: createImage(IMAGES.e3_death),
};

//实例化对象,天空类配置
const SKY = {
  bg: bg,
  width: 480,
  height: 700,
  //10毫秒变化一次
  speed: 10,
};

//飞机加载配置项
const LOADING = {
  frame: loading_frame,
  frameIndex: 0,
  width: 248,
  height: 50,
  x: 0,
  y: 700 - 50,
  speed: 300,
};

//飞机配置项
const PLANE = {
  frame: plane_frame,
  width: 102,
  height: 126,
  speed: 100,
};

//飞机子弹配置项
const BULLET = {
  img: b,
  width: 5,
  height: 11,
};

//敌机配置类
//小敌机配置
const E1 = {
  type: 1,
  width: 57,
  height: 51,
  life: 1,
  score: 1,
  frame: e1,
  minSpeed: 20,
  maxSpeed: 10,
};
//中敌机配置
const E2 = {
  type: 2,
  width: 69,
  height: 95,
  life: 4,
  score: 4,
  frame: e2,
  minSpeed: 50,
  maxSpeed: 20,
};
//大敌机配置
const E3 = {
  type: 3,
  width: 169,
  height: 258,
  life: 20,
  score: 20,
  frame: e3,
  minSpeed: 100,
  maxSpeed: 100,
};
