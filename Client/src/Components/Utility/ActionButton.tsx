interface ActionButtonProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ActionButton = ({
  label,
  onClick,
  style,
  type,
  disabled,
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 fw-bold btn btn-primary fs-4 px-4 rounded-5 btnTransform"
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButton;
