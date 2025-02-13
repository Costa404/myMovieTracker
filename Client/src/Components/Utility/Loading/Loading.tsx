type LoadingSpinnerProps = {
  style?: React.CSSProperties;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ style }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-primary"
        style={{ width: "6rem", height: "6rem", zIndex: "999", ...style }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
