interface ActionButtonProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const ActionButton = ({ label, onClick, style, type }: ActionButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 fw-bold btn btn-primary fs-4 px-4 rounded-5 btnTransform"
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};

export default ActionButton;
