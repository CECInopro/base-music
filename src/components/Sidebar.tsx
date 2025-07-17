import React from "react";
import { useNavigate } from "react-router-dom";
const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                <img src="/public/image/logo.png" alt="laomusic" style={{ width: 150 }} />
            </div>
            <nav>
                <ul>
                    <li onClick={() => navigate("/")} className="active"><i className="icon-home" /> Home</li>
                    <li><i className="icon-ranking" /> Rankings</li>
                    <li><i className="icon-topic" /> Topics and genres</li>
                    <li><i className="icon-library" /> Library</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;