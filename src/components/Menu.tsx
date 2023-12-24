export const Menu = ({ onNewGame }: { onNewGame: () => void }) => {
    return (
        <>
            <div className="menu-container">
                <div className="menu">
                    <h2>How to play</h2>
                    <h3>Player 1</h3>
                    <p>Up: w Down: s</p>
                    <h3>Player 2</h3>
                    <p>Up: o Down: l</p>
                    <button onClick={onNewGame}>New Game</button>
                </div>
            </div>
        </>
    );
};
