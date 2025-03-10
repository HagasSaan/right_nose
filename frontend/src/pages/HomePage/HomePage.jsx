import "./HomePage.scss";
import { NavLink, Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <nav className="home-nav">
        <NavLink to="">Home Page</NavLink>
        <NavLink to="rooms" end>
          Rooms
        </NavLink>
      </nav>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
}
