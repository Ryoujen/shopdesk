import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
        Go Home
      </Link>
    </div>
  );
}
