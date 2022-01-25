import { Link } from "react-router-dom";
import "./error.css";

export default function ErrorPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <Link to="/home">Homepage</Link>
      </div>
    </div>
  );
}
