export const Menu = ({ onNewGame }: { onNewGame: () => void }) => {
    return (
        <>
            <div className="menu-container">
                <div className="menu">
                    <h2>How to play</h2>
                    <h3>Player 1</h3>
                    <p>
                        Up: <b>W</b> Down: <b>S</b>
                    </p>
                    <h3>Player 2</h3>
                    <p>
                        Up: <b>O</b> Down: <b>L</b>
                    </p>
                    <p>
                        Press <b>G</b> to start the round
                    </p>
                    <button onClick={onNewGame}>New Game</button>
                    <p
                        style={{
                            paddingTop: "2em",
                            paddingBottom: 0,
                            margin: 0,
                        }}
                    >
                        <a
                            href="https://github.com/Daniel-Const/inversepong"
                            target="_blank"
                        >
                            Github
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};
