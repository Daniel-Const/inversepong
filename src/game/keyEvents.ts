import Player from "../game-objects/Player";

const initKeyEventHandlers = (
    players: Player[],
    startRoundCallback: () => void
) => {
    players.forEach((player) => {
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

    document.addEventListener("keydown", (event) => {
        if (event.key === "g") startRoundCallback();
    });
};

export default initKeyEventHandlers;
