const gamePlay = {
  key: 'gamePlay',
  // preload, create只會執行一次
  preload: function () {
    // 載入資源(圖片)
    this.load.image('bg1', 'images/bg/bg1.png');
    this.load.image('bg2', 'images/bg/bg2.png');
    this.load.image('bg3', 'images/bg/bg3.png');
    this.load.image('bg4', 'images/bg/bg4.png');
    this.load.image('footer', 'images/bg/footer.png');
    this.load.spritesheet('user', 'images/player.png', { frameWidth: 144, frameHeight: 120 });
    //btn
    this.load.image('btnLeft', 'images/ui/btn-left.png');
    this.load.image('btnRight', 'images/ui/btn-right.png');


    this.timeInt = 30;
    this.speedLv = 1;
    this.gameStop = false;
  },

  create: function () {
    // 資源載入完成，加入遊戲物件及相關設定(順序跟疊加有關)
    this.bg4 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg4');
    this.bg3 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg3');
    this.bg2 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg2');
    this.bg1 = this.add.tileSprite(w / 2, h / 2, w, h, 'bg1');
    this.footer = this.add.tileSprite(w / 2, h - 45, w, 90, 'footer');
    this.btnLeft = this.add.image(100, h - 40, 'btnLeft');
    this.btnRight = this.add.image(w - 100, h - 40, 'btnRight');
    this.btnLeft.setScale(0.5);
    this.btnRight.setScale(0.5);

    // 把footer丟進物理世界
    this.physics.add.existing(this.footer)
    // 設定物件不會動靜止不會掉下去
    this.footer.body.immovable = true;
    // 物件的位置和旋轉是否受其速度，加速度，阻力和重力的影響
    this.footer.body.moves = false;

    //設定人物位置 sprite 是單一物件，不會重覆所以不用tileSprite
    this.player = this.physics.add.sprite(150, 150, 'user');

    //設定角色彈跳值
    this.player.setBounce(1);

    //設定角色碰撞邊界(正常會小一點)
    this.player.setSize(100, 100, 0);

    //將需要碰撞的物件綁在一起
    this.physics.add.collider(this.player, this.footer);

    this.player.setScale(0.7); // 伸縮

    this.player.setCollideWorldBounds(true) //角色邊界設定

    // 設定影格並呼叫
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),//跑步只有第0跟1格
      frameRate: 5,
      repeat: -1
    })

    // 加速度時的動畫影格
    this.anims.create({
      key: 'speed',
      frames: this.anims.generateFrameNumbers('user', { start: 4, end: 5 }),//左右鍵加速時
      frameRate: 5,
      repeat: -1
    })

    this.timeText = this.add.text(w - 150, 20, `Time:${this.timeInt}`, { color: '#fff', fontSize: '30px' })

    let timer = setInterval(() => {
      this.timeInt--;
      // 直接設定上方文字來單純改變文字內容
      this.timeText.setText(`Time:${this.timeInt}`)

      if (this.timeInt <= 20 && this.timeInt > 10) {
        this.speedLv = 2;
      } else if (this.timeInt <= 10 && this.timeInt > 0) {
        this.speedLv = 4;
      }

      if (this.timeInt <= 0) {
        clearInterval(timer);
        this.gameStop = true;
      }
    }, 1000);

    this.player.anims.play('run', true);


    //開啟物件互動設定
    this.btnLeft.setInteractive();
    //開啟物件互動設定
    this.btnRight.setInteractive();
    this.btnLeft.on('pointerdown', () => {
      this.player.anims.play('speed', true);
      this.player.flipX = true;
      this.player.setVelocityX(-200);
      console.log('left');
    })
    this.btnRight.on('pointerdown', () => {
      this.player.anims.play('speed', true);
      this.player.flipX = false;
      this.player.setVelocityX(200);
      console.log('right');
    })

  },

  update: function () {
    if (this.gameStop === true) return;
    // 遊戲狀態更新(60fps更新)
    this.bg3.tilePositionX += 2 * this.speedLv;
    this.bg2.tilePositionX += 3 * this.speedLv;
    this.bg1.tilePositionX += 4 * this.speedLv;
    this.footer.tilePositionX += 4 * this.speedLv;

    //每60秒偵聽有無按鍵事件
    const keyboard = this.input.keyboard.createCursorKeys();//使用一般的上下左右space shift
    if (keyboard.right.isDown) {
      this.player.anims.play('speed', true);
      this.player.flipX = false;
      this.player.setVelocityX(200);
      console.log('right');
    } else if (keyboard.left.isDown) {
      this.player.anims.play('speed', true);
      this.player.flipX = true;
      this.player.setVelocityX(-200);
      console.log('left');
    }
    // } else {  //放開時，init 原始狀態
    //   this.player.anims.play('run', true);
    //   this.player.flipX = false;
    //   this.player.setVelocityX(0);
    // }
    if (keyboard.up.isDown && this.player.body.touching.down) {

    }

  }
}