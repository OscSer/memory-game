import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SetupForm.css';
import {
  useUserDispatch,
  useUserState,
} from '@contexts/user-context/UserContext';
import { Logo } from '@components/logo/Logo';
import { NumberOfCards } from '@models/NumberOfCards';
import { setUserState } from '@services/storage-service/LocalStorageService';

export function SetupForm() {
  const navigate = useNavigate();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setUserState(userState);
      navigate('board');
    }
    setValidated(true);
  };

  const onChangeNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      userDispatch({
        type: 'update',
        payload: { ...userState, nickname: event.target.value },
      });
    },
    [userDispatch, userState]
  );

  const onChangeCards = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      userDispatch({
        type: 'update',
        payload: {
          ...userState,
          numberOfCards: parseInt(event.target.value, 10),
        },
      });
    },
    [userDispatch, userState]
  );

  const getCardOptions = useCallback(() => {
    const values = Object.values(NumberOfCards);
    const numbers = values.filter((value) => !Number.isNaN(Number(value)));
    return numbers.map((number) => (
      <option key={number} value={number}>
        {number}
      </option>
    ));
  }, []);

  return (
    <>
      <Logo />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="setupForm"
      >
        <FloatingLabel controlId="nickname" label="Nickname" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Nickname"
            autoComplete="off"
            value={userState.nickname}
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
          <Form.Select value={userState.numberOfCards} onChange={onChangeCards}>
            {getCardOptions()}
          </Form.Select>
        </FloatingLabel>

        <Button type="submit" variant="primary">
          Start
        </Button>
      </Form>
    </>
  );
}
