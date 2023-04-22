import { Alert } from 'react-bootstrap';

type Props = {
  variant: 'primary' | 'success';
  body: JSX.Element | string;
  show: boolean;
};

export function CustomAlert({ variant, body, show }: Props) {
  return (
    <Alert show={show} variant={variant} style={{ marginBottom: 20 }}>
      {body}
    </Alert>
  );
}
