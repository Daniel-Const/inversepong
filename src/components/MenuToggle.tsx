export const MenuToggle = ({
    toggleMenu,
    setToggleMenu,
}: {
    toggleMenu: boolean;
    setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    function toggle() {
        setToggleMenu(!toggleMenu);
    }

    return (
        <>
            <button onClick={toggle} className="menu-toggle">
                Menu
            </button>
        </>
    );
};
