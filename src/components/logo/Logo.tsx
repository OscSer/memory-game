import logo from '@assets/memory-logo.png';
import './Logo.css';

export function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Memory Logo" className="logo__img" />
      Memory
    </div>
  );
}
