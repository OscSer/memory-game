import { Card } from 'react-bootstrap';
import './Counter.css';

type Props = {
  value: number;
  label: string;
};

export function Counter({ label, value }: Props) {
  return (
    <Card>
      <Card.Body className="counter">
        <div className="counter__value">{value}</div>
        <div className="counter__label">{label}</div>
      </Card.Body>
    </Card>
  );
}
