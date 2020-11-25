const config = {
  type: Phaser.AUTO, //
  width: w,
  height: h,
  parent: 'app',//對應div id 塞入一個canvas
  physics: {
    default: 'arcade',//基本的物理效果
    arcade: {
      gravity: { //重力多重
        y: 700 //一般是1500，但蒲公英較輕所以用700
      },
      debug: {}
    },
  },
  scene: [gameStart, gamePlay] // 場景狀態 
}

const game = new Phaser.Game(config);