import "./HomePage.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPython, FaNodeJs, FaBolt, FaProjectDiagram, FaComments } from "react-icons/fa";

export default function HomePage() {
  const credential = useSelector((state) => state.auth.credential);
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <div className="description">
          <h1>⚡ An Online IDE for Interviews</h1>
          <p className="subtitle">Fast. Collaborative. Browser-based.</p>

          <div className="section">
            <h2>✅ Supported Languages</h2>
            <ul>
              <li><FaPython className="icon" /> Python 3</li>
              <li><FaNodeJs className="icon" /> JavaScript (Node.js 22)</li>
            </ul>
          </div>

          <div className="section">
            <h2>🚀 Features</h2>
            <ul>
              <li><FaComments className="icon" /> Real-time code sharing with WebSockets</li>
              <li><FaProjectDiagram className="icon" /> Isolated coding rooms</li>
              <li><FaBolt className="icon" /> Fast processing & low latency</li>
            </ul>
          </div>
        </div>
      )}
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
}
