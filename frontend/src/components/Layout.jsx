import { Outlet, Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import "../App.scss";
import { useSelector } from "react-redux";

export default function Layout() {
  const credential = useSelector((state) => state.auth.credential);
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {
            credential ? (
              <>
                <Link to="/rooms" className="nav-link">Rooms</Link>
                <Link to="/logout" className="nav-link">Logout</Link>
              </>
            )
            : <Link to="/auth" className="nav-link">Login</Link>
          }
        </nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
