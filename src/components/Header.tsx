import React from "react";

const Header: React.FC = () => (
    <header className="header">
        <input className="search" placeholder="What do you want to listen to?" />
        <div className="header-actions">
            <button className="settings-btn">⚙️</button>
            <button className="login-btn">Login</button>
        </div>
    </header>
);

export default Header;