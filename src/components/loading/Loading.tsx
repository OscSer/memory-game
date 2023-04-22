import { Spinner } from 'react-bootstrap';
import './Loading.css';

export function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
