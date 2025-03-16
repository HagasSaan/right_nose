import "./HomePage.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const credential = useSelector((state) => state.auth.credential);
  const location = useLocation();

  return (
    <>
      <nav className="home-nav">
        <NavLink to="">Home Page</NavLink>
        {credential ? (
          <NavLink to="rooms" end>
            Rooms
          </NavLink>
        ) : (
          <NavLink to="auth">Log in</NavLink>
        )}
      </nav>
      {location.pathname === "/" ? (
        <div className="description">
          <p>An Online IDE</p>
          <p>Supported languages:</p>
          <ul>
            <li>Python 3</li>
            <li>JavaScript (Node.js 22)</li>
          </ul>
          <p>Supported features:</p>
          <ul>
            <li>
              Websockets, allowing to show your code to another people in real
              time, enabling to do pair programming or interviews
            </li>
            <li>Isolated rooms</li>
            <li>Fast processing time (based on backend speed, but still)</li>
          </ul>
        </div>
      ) : null}
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
}
