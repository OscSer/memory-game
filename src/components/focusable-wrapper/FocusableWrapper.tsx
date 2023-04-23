import './FocusableWrapper.css';

interface Props {
  callback: () => void;
  hidden?: boolean;
}

export function FocusableWrapper({
  children,
  callback,
  hidden = false,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      type="button"
      className="focusableWrapper"
      onClick={callback}
      hidden={hidden}
    >
      {children}
    </button>
  );
}
