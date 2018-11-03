enchant();

IMAGE = {
    bear1: "./assets/images/chara1.png"
};

const main = () => {
    const game = new Core();
    game.fps = 60;
    game.preload(IMAGE.bear1);
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
        const bear = new Bear(144, 144);

        ////////////////////////////////////////
        // マウスの座標にオブジェクトを追従
        // http://jsdo.it/tamaki998/akzY(引用)
        game.addEventListener("enterframe", function () {
            setPosition(bear, bear.width / 2);
        });

        function setPosition(obj, offset) {
            window.document.onmousemove = function (e) {
                obj.moveTo(getMousePosition(e).x - offset, getMousePosition(e).y - offset);
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
