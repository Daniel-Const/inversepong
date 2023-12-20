import game from "./Game";

const initKeyEventHandlers = () => {
    game.players.forEach((player) => {
        document.addEventListener("keydown", (event) => {
            if (event.key === player.upKey) {
                player.motionHandler.isMovingUp = true;
            }
            if (event.key === player.downKey) {
                player.motionHandler.isMovingDown = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === player.upKey) {
                player.motionHandler.isMovingUp = false;
            }
            if (event.key === player.downKey) {
                player.motionHandler.isMovingDown = false;
            }
        });
    });
};

export default initKeyEventHandlers;
