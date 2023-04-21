import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useCallback, useState } from 'react';

import './SetupForm.css';
import { MemoryLogo } from '../../components/memory-logo/MemoryLogo';

interface FormData {
  validated: boolean;
  nickname: string;
  numberOfCards: number;
}

export function SetupForm() {
  const [formData, setFormData] = useState<FormData>({
    validated: false,
    nickname: '',
    numberOfCards: 12,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('valid form!');
    }
    setFormData((data) => ({ ...data, validated: true }));
  };

  const onChangeNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((data) => ({ ...data, nickname: event.target.value }));
    },
    []
  );

  const onChangeCards = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData((data) => ({
        ...data,
        numberOfCards: parseInt(event.target.value, 10),
      }));
    },
    []
  );

  return (
    <>
      <MemoryLogo />
      <Form
        noValidate
        validated={formData.validated}
        onSubmit={handleSubmit}
        className="setupForm"
      >
        <FloatingLabel controlId="nickname" label="Nickname" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={onChangeNickname}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a nickname.
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="cards"
          label="Number of cards"
          className="mb-3"
        >
          <Form.Select value={formData.numberOfCards} onChange={onChangeCards}>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </Form.Select>
        </FloatingLabel>

        <Button type="submit" variant="outline-primary">
          Start
        </Button>
      </Form>
    </>
  );
}
