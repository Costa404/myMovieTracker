interface ActionButtonProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ActionButton = ({ label, onClick, style }: ActionButtonProps) => {
  return (
    <button
      className="p-2 fw-bold btn btn-primary fs-4 px-4 rounded-5 btnTransform"
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};

export default ActionButton;
