enchant();

IMAGE = {
    bear1: "./assets/images/chara1.png",
    icon: "./assets/images/icon0.png",
    apad: "./assets/images/apad.png"
};

const main = () => {
    const game = new Core();
    game.fps = 60;
    game.preload(IMAGE.bear1);
    game.preload(IMAGE.icon);
    game.preload(IMAGE.apad);
    const scene = game.rootScene;
    scene.backgroundColor = "#666";

    game.on('load', () => {
        const Bear = Class.create(Sprite, {
            initialize: function(x, y) {
                Sprite.call(this, 32, 32);
                this.x = x;
                this.y = y;
                this.image = game.assets[IMAGE.bear1];
                scene.addChild(this);
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
                bear.frame = 0;
            };
        });
        ////////////////////////////////////////
        // マウスの座標にオブジェクトを追従
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
        ////////////////////////////////////////
    });
    game.start();
};

window.addEventListener('load', main);
