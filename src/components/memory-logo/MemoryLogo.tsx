import logo from '@assets/memory-logo.png';
import './MemoryLogo.css';

export function MemoryLogo() {
  return (
    <div className="memoryLogo">
      <img src={logo} alt="Memory Logo" className="memoryLogo__img" />
      Memory
    </div>
  );
}
