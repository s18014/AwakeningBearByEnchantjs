enchant();

let game;

IMAGE = {
    bear: "./assets/images/chara1.png",
    icon: "./assets/images/icon0.png",
    apad: "./assets/images/apad.png",
    start: "./assets/images/start.png",
    map: "./assets/images/map0.png"
};

SOUND = {
    slap: "./assets/sounds/slap1.mp3",
    boyDamage1: "./assets/sounds/game_thief-boy-damage1.mp3",
    boyDeath1: "./assets/sounds/game_thief-boy-death1.mp3",
    ko: "./assets/sounds/ko1.mp3",
    BGM1: "./assets/sounds/game_maoudamashii_5_casino01.mp3"
};

BEAR_LINES = [
    "痛い！！",
    "やめて！！",
    "あっ...",
    "なんだか...",
    "だめぇぇぇ！！！"
];

// マップのデータ
tiles = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

objs = [
    [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16],
    [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
];

RADIAN = Math.PI / 180; // ラジアン、座標計算で使う

MOUSE_POS = {x: 0, y: 0};

const Bear = Class.create(Sprite, {
    initialize: function(scene, x, y) {
        Sprite.call(this, 32, 32);
        this.maxHp = 3;
        this.hp = this.maxHp;
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.vx = this.speed;
        this.vy = 0;
        this.image = game.assets[IMAGE.bear];
        this.on("enterframe", function () {
            this.update();
        });
        scene.addChild(this);
    },

    move: function () {
        this.x += this.vx;
        this.y += this.vy;
        this.scaleX = this.vx / Math.abs(this.vx);
    },

    randomDirection: function () { // 一定フレームごとに向きを変える処理
        if (this.age % 70 != 0) return;
        var r = Math.random() * 360;
        this.vx = Math.sin(RADIAN * r) * this.speed;
        this.vy = Math.cos(RADIAN * r) * this.speed;
    },

    returnToWindow: function () { // クマを画面内に戻す処理、数字の1はおまじない
        if (this.x > game.width - this.width) {
            this.x = game.width - this.width - 1;
            this.vx = -this.vx;
        }
        if (this.x < 0) {
            this.x = 1;
            this.vx = -this.vx;
        }
        if (this.y > game.height - this.height) {
            this.y = game.height - this.height - 1;
            this.vy = -this.vy;
        }
        if (this.y < 0) {
            this.y = 1;
            this.vy = -this.vy;
        }

    },

    hit: function () {
        this.hp -= 1 / game.fps; // ダメージ処理、1/FPSで毎フレームごとの秒数を引いている
        if (this.hp < 0) this.hp = 0;
        this.frame =  3;
    },

    moveAnime: function () {
        this.frame = this.age / 3 % 3;
    },

    getHpRatio: function () {
        return this.hp / this.maxHp;
    },

    update: function () {
        this.move();
        this.randomDirection();
        this.returnToWindow();
    }

});

const Stick = Class.create(Sprite, {
    initialize: function (scene, x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 16 * 3 + 8;
        this.scaleX = 1.5;
        this.scaleY = 1.5;
        this.image = game.assets[IMAGE.icon];
        this.on("enterframe", function() {
            this.x = MOUSE_POS.x - this.width / 2;
            this.y = MOUSE_POS.y - this.height / 2;
        });
        scene.addChild(this);
    },

    hit: function () {
        this.frame = 16 * 3 + 8 + (this.age / 3 % 3);
    },

    setDefultFrame: function () {
        this.frame = 16 * 3 + 8;
    }
});

const Cursor = Class.create(Sprite, {
    initialize: function (scene, x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 16 * 2 + 11;
        this.rotation = -45;
        this.image = game.assets[IMAGE.icon];
        this.on("enterframe", function() {
            this.x = MOUSE_POS.x - this.width / 2;
            this.y = MOUSE_POS.y - this.height / 2;
        });
        scene.addChild(this);
    }
});

const GaugeBar = Class.create(Surface, {
    initialize:  function (scene, x, y, x2, y2) {
        Surface.call(this, game.width, game.height);
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.gauge = 0; // 現在のゲージの長さを表す0~1の間で使う
        this.on("enterframe", function() {
            this.draw();
        });
        scene.addChild(this);
    },
    draw: function () {
        // 枠とゲージを描写
        this.context.clearRect(0, 0, game.width, game.height);
        this.context.beginPath();
        this.context.strokeStyle = "red";
        this.context.strokeRect(this.x, this.y, this.x2, this.y2);
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "rgb(255, 255, 255, 0.2)";
        this.context.fillRect(this.x, this.y, this.x2, this.y2);
        this.context.beginPath();
        this.context.fillStyle = "rgb(255, 90, 90, 0.5)";
        this.context.fillRect(this.x, this.y, this.x2, this.y2 * this.gauge); // this.y2に0~1を掛けてゲージの長さを表現
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.fillRect(this.x, this.y + this.y2 * this.gauge, this.x2, 3);
        this.context.fill();
    }
});

const Comments = Class.create(Label, {
    initialize: function (scene, speeker, comments) {
        Label.call(this, "");
        this.speeker = speeker;
        this.comments = comments;
        this.font = "16px monospace";
        this.textAlign = "center";
        this.backgroundColor = "rgb(255, 255, 255, 0.7)";
        scene.addChild(this);
    },

    show: function (index) {
        this.visible = true;
        this.text = this.comments[index];
        this.height = 20;
        this.width = this.text.length * 18;
        this.x = this.speeker.x - this.width / 2 + this.speeker.width / 2;
        this.y = this.speeker.y - 20;
    },

    invisible: function () {
        this.visible = false;
    }
});

const MyMap = Class.create(Map, {
    initialize: function (scene, w, h, image, loadData) {
        Map.call(this, w, h);
        this.image = image;
        this.loadData(loadData);
        scene.addChild(this);
    }
});


const main = () => {
    game = new Core();
    game.fps = 60;
    game.time = 0;
    game.preload([
        IMAGE.bear,
        IMAGE.apad,
        IMAGE.icon,
        IMAGE.start,
        IMAGE.map
    ]);
    game.preload([
        SOUND.slap,
        SOUND.boyDeath1,
        SOUND.boyDamage1,
        SOUND.ko,
        SOUND.BGM1
    ]);

    document.body.addEventListener("mousemove", function (e) { // マウスの座標を取得
        MOUSE_POS.x = e.pageX / game.scale;
        MOUSE_POS.y = e.pageY / game.scale;
    });

    game.on('load', () => {

        // ----- タイトルシーンの作成 -----
        const titleScene = function () {
            const scene = new Scene();
            scene.backgroundColor = "rgb(255, 90, 90, 0.3)";

            const cursor = new Cursor(scene, 0, 0);
            const startText = new Sprite(236, 48);
            startText.image = game.assets[IMAGE.start];
            startText.x = game.width / 2 - 236 / 2;
            startText.y = game.height / 2 - 48;
            scene.addChild(startText);

            scene.on("touchstart", function() {
                game.popScene();
            });
            return scene;
        };

        // ----- ゲームシーンの作成 -----
        const gameScene = function () {
            const scene = new Scene();
            scene.backgroundColor = "#999";

            // 初期化処理
            const map1 = new MyMap(scene, 16, 16, game.assets[IMAGE.map], tiles);
            const map2 = new MyMap(scene, 16, 16, game.assets[IMAGE.map], objs);
            const bear = new Bear(scene, 144, 144);
            const stick = new Stick(scene, -100, -100);
            const comment = new Comments(scene, bear, BEAR_LINES);
            const ecstasyGauge = new GaugeBar(scene, 10, game.height - 10, 30, -game.height + 60);
            const bgm = game.assets[SOUND.BGM1];
            bgm.volume = 0.7;

            ecstasyGauge.draw();

            // MAIN処理
            scene.addEventListener("enterframe", function () {
                bgm.play();

                // 棒とクマが当たった時の処理
                if (stick.intersect(bear)) {
                    game.assets[SOUND.slap].play();
                    stick.hit();
                    bear.hit();
                    var ratio = bear.getHpRatio();
                    if (ratio < 0.2) {
                        comment.show(4);
                    } else if (ratio < 0.3) {
                        comment.show(3);
                    } else if (ratio < 0.5){
                        comment.show(2);
                    } else if (ratio < 0.7) {
                        comment.show(1);
                    } else {
                        comment.show(0);
                    }
                } else {
                    stick.setDefultFrame();
                    bear.moveAnime();
                    comment.invisible();
                };

                // 快感ゲージとクマのHPを同期する
                ecstasyGauge.gauge = 1 - bear.getHpRatio();

                // ゲームオーバー処理
                if (bear.hp <= 0) {
                    game.assets[SOUND.ko].play();
                    game.pushScene(gameOverScene());
                }
            });
            return scene;
        };

        // ゲームオーバーシーンの作成
        const gameOverScene = function () {
            const scene = new Scene();
            scene.backgroundColor = "rgb(255, 90, 90, 0.6)";
            return scene;
        };
        game.replaceScene(gameScene());
        game.pushScene(titleScene());
    });
    game.start();
};

window.addEventListener('load', main);
