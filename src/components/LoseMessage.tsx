import "./components.css";

export const LoseMessage = ({ show }: { show: boolean }) => {
    if (show == true) {
        return (
            <div className="lose-message">
                <h1>You Lose</h1>
            </div>
        );
    }
    return (<></>)
};
