
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found container">
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
