import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [keyword, setKeyword] = useState<string>(params.get('q') || '');
    const debounced = useDebounce(keyword, 400);

    React.useEffect(() => {
        if (debounced.trim().length === 0) return;
        navigate(`/search?q=${encodeURIComponent(debounced.trim())}`);
    }, [debounced, navigate]);

    return (
        <header className="header">
            <input
                className="search"
                placeholder="What do you want to listen to?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="header-actions">
                <button className="settings-btn">⚙️</button>
                <button className="login-btn">Login</button>
            </div>
        </header>
    );
};

export default Header;