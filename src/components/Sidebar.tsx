import React from "react";

const Sidebar: React.FC = () => (
    <aside className="sidebar">
        <div className="logo">
            <img src="/public/image/logo.png" alt="laomusic" style={{ width: 48 }} />
        </div>
        <nav>
            <ul>
                <li className="active"><i className="icon-home" /> Home</li>
                <li><i className="icon-ranking" /> Rankings</li>
                <li><i className="icon-topic" /> Topics and genres</li>
                <li><i className="icon-library" /> Library</li>
            </ul>
        </nav>
    </aside>
);

export default Sidebar;