import { Spinner } from 'react-bootstrap';
import './Loading.css';

export function Loading() {
  return (
    <div className="Loading">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
