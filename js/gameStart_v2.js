const gameStart = {
  key: 'gameStart',
  preload: function () {
    // 載入資源(圖片)
    this.load.image('bg1', 'images/bg/bg1.png');
    this.load.image('bg2', 'images/bg/bg2.png');
    this.load.image('bg3', 'images/bg/bg3.png');
    this.load.image('bg4', 'images/bg/bg4.png');
    this.load.image('footer', 'images/bg/footer.png');
    this.load.spritesheet('user', 'images/player.png', { frameWidth: 144, frameHeight: 120 });

    this.load.image('logo', 'images/ui/txt-title.png');
    this.load.image('startBtn', 'images/ui/btn-press-start.png');
    this.load.image('playerEnd', 'images/ui/player-end.png');

  },
  create: function () {
    // 資源載入完成，加入遊戲物件及相關設定(順序跟疊加有關)
    this.bg4 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg4');
    this.bg3 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg3');
    this.bg2 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg2');
    this.bg1 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg1');
    this.footer = this.add.tileSprite(w / 2, h - 90, w, 90, 'footer');

    //簡易圖片容器 ?RWD?
    this.logo = this.add.image(w / 2, (h / 2) - 50, 'logo');
    this.logo.setScale(0.5);

    this.startBtn = this.add.image(w / 2, (h / 2) + 40, 'startBtn');
    this.startBtn.setScale(0.5);

    //開啟物件互動設定
    this.startBtn.setInteractive();

    // 事件相關api 點擊為pointerdown
    this.startBtn.on('pointerdown', () => {
      this.scene.start('gamePlay')
    })


  },
  update: function () {
    // 遊戲狀態更新(60fps更新)
    this.bg3.tilePositionX += 2;
    this.bg2.tilePositionX += 3;
    this.bg1.tilePositionX += 4;
    this.footer.tilePositionX += 4;
  }
}