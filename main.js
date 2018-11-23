enchant();

let game, scene;

IMAGE = {
    bear: "./assets/images/chara1.png",
    icon: "./assets/images/icon0.png",
    apad: "./assets/images/apad.png"
};

BEAR_LINES = [
    "痛い！！",
    "やめて！！",
    "あっ...",
    "きもち...",
    "だめぇぇぇ！！！"
]

RADIAN = Math.PI / 180; // ラジアン、座標計算で使う

const Bear = Class.create(Sprite, {
    initialize: function(x, y) {
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
    initialize: function (x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 16 * 3 + 8;
        this.scaleX = 1.5;
        this.scaleY = 1.5;
        this.image = game.assets[IMAGE.icon];
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
    initialize: function (x, y) {
        Sprite.call(this, 100, 100);
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.scaleX = 0.3;
        this.scaleY = 0.3;
        this.image = game.assets[IMAGE.apad];
        scene.addChild(this);
    }
});

const GaugeBar = Class.create(Surface, {
    initialize:  function (x, y, x2, y2) {
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
        this.context.fillRect(this.x, this.y, this.x2, this.y2 * this.gauge); // this.y2に0~1を掛けてゲージの長さを表現
        this.context.fillStyle = "rgb(255, 90, 90, 0.3)";
        this.context.fill();
    }
});

const Comments = Class.create(Label, {
    initialize: function (speeker, comments) {
        Label.call(this, "");
        this.speeker = speeker;
        this.comments = comments;
        this.font = "16px monospace";
        this.textAlign = "center";
        this.backgroundColor = "rgb(255, 255, 255, 0.6)";
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



////////////////////////////////////////
// マウスの座標にオブジェクトを追従させるための関数
// http://jsdo.it/tamaki998/akzY(引用)

function setPosition(objs) {
    window.document.onmousemove = function (e) {
        objs.forEach((obj) => {
            obj.moveTo(getMousePosition(e).x - obj.width / 2, getMousePosition(e).y - obj.height / 2);
        });
    };
}

function getMousePosition(e) {
    var pos = [];
    if(e) {
        // game.scaleの値が反映されている？ので割ってあげる
        pos.x = e.pageX / game.scale;
        pos.y = e.pageY / game.scale;
    }
    else {
        pos.x = (event.x + document.body.scrollLeft) / game.scale;
        pos.y = (event.y + document.body.scrollTop) / game.scale;
    }
    return pos;
}
// マウスの座標にオブジェクトを追従させるための関数
// http://jsdo.it/tamaki998/akzY(引用)
////////////////////////////////////////


const main = () => {
    game = new Core();
    game.fps = 60;
    game.preload(IMAGE.bear);
    game.preload(IMAGE.icon);
    game.preload(IMAGE.apad);
    game.time = 0;
    scene = game.rootScene;
    scene.backgroundColor = "#666";


    game.on('load', () => {
        // 初期化処理
        const bear = new Bear(144, 144);
        const stick = new Stick(-100, -100);
        const cursor = new Cursor(-100, -100);
        const ecstasyGauge = new GaugeBar(10, game.height - 10, 30, -game.height + 60);
        const comment = new Comments(bear, BEAR_LINES);

        // MAIN処理
        game.addEventListener("enterframe", function () {
            setPosition([stick, cursor]); // マウスの位置に棒とカーソルを持ってくる、コピペした関数


            // 棒とクマが当たった時の処理
            if (stick.intersect(bear)) {
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
                scene.removeChild(ecstasyGauge);
                scene.removeChild(comment);
                scene.removeChild(stick);
                scene.removeChild(cursor);
                bear.x = game.width / 2 - 16;
                bear.y = game.height / 2 + 100;
                bear.scaleX = 15;
                bear.scaleY = 15;
                bear.frame = 0;
                game.stop();
            }
        });
    });
    game.start();
};

window.addEventListener('load', main);
