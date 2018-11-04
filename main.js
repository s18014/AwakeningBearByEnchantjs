enchant();

IMAGE = {
    bear1: "./assets/images/chara1.png",
    icon: "./assets/images/icon0.png",
    apad: "./assets/images/apad.png"
};

RADIAN = Math.PI / 180;
const main = () => {
    const game = new Core();
    game.fps = 60;
    game.preload(IMAGE.bear1);
    game.preload(IMAGE.icon);
    game.preload(IMAGE.apad);
    const scene = game.rootScene;
    scene.backgroundColor = "#666";

    ////////////////////////////////////////
    // Classの作成
    game.on('load', () => {
        const Bear = Class.create(Sprite, {
            initialize: function(x, y) {
                Sprite.call(this, 32, 32);
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                this.speed = 3;
                this.image = game.assets[IMAGE.bear1];
                this.on("enterframe", function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.scaleX = this.vx / Math.abs(this.vx);
                    this.returnToWindow();
                });
                scene.addChild(this);
            },
            randomVector: function () {
                var r = Math.random() * 360;
                this.vx = Math.sin(RADIAN * r) * this.speed;
                this.vy = Math.cos(RADIAN * r) * this.speed;
            },
            returnToWindow: function () {
                if (this.x > game.width - this.width|| this.x < 0) {
                    this.x -= this.vx;
                    this.vx = -this.vx;
                }
                if (this.y > game.width - this.height|| this.y < 0) {
                    this.y -= this.vy;
                    this.vy = -this.vy;
                }
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
                /*
                this.on("enterframe", function () {
                    this.frame = 16 * 3 + 8 + (this.age / 3 % 3);
                    this.rotation = this.age * -15 % 125;
                });
                */
                scene.addChild(this);
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
        // Classの作成
        ////////////////////////////////////////

        const bear = new Bear(144, 144);
        const stick = new Stick(0, 0);
        const cursor = new Cursor(0, 0);

        game.addEventListener("enterframe", function () {
            setPosition([stick, cursor]);
            if (stick.intersect(bear)) {
                stick.rotation = game.frame * -15 % 125;
                bear.frame = 3;
            } else {
                stick.rotation = 0;
                bear.frame = game.frame / 3 % 3;
            };

            if (game.frame % 70 == 0) bear.randomVector();
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
                pos.x = (event.x + document.body.scrollLeft)/ game.scale;
                pos.y = (event.y + document.body.scrollTop)/ game.scale;
            }
            return pos;
        }
        // マウスの座標にオブジェクトを追従させるための関数
        // http://jsdo.it/tamaki998/akzY(引用)
        ////////////////////////////////////////
    });
    game.start();
};

window.addEventListener('load', main);
