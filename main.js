enchant();

const main = () => {
    const game = new Core();
    const scene = game.rootScene;

    game.on('load', () => {
    });
    game.start();
};

window.addEventListener('load', main);
