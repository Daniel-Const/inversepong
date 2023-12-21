import { MouseEventHandler } from "react";

export const Button = ({ onClick, label }: { onClick: MouseEventHandler, label: string }) => {
    return (
        <>
            <button onClick={onClick}>
                {label}
            </button>
        </>
    );
};
