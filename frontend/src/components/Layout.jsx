import { Outlet, Link } from "react-router-dom";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../slices/ThemeSelectorSlice";

export default function Layout() {
  const selectedTheme = useSelector((state) => state.themeSelector.value);
  const credential = useSelector((state) => state.auth.credential);
  const dispatch = useDispatch();

  function toggleTheme() {
    if (selectedTheme == "dark") {
      dispatch(selectTheme("light"));
    } else {
      dispatch(selectTheme("dark"));
    }
  }

  return (
    <div className={`layout ${selectedTheme === "dark" ? "dark-theme" : ""}`}>
      <header className="layout-header">
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {credential ? (
            <>
              <Link to="/rooms" className="nav-link">
                Rooms
              </Link>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/auth" className="nav-link">
              Login
            </Link>
          )}
        </nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {selectedTheme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
