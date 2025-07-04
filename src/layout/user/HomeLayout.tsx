import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#230505", height: "100vh", overflowY: "auto" }}>
            <Header />
            {children}
        </div>
    </div>
);

export default HomeLayout;