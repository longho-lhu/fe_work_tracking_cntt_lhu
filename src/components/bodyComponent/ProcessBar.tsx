const ProgressBar = ({ value1, value2 }: { value1: number; value2: number }) => {
  const total = value1 + value2;
  const percent1 = total > 0 ? (value1 / total) * 100 : 0; // Tránh chia cho 0
  const percent2 = 100 - percent1;

  return (
    <div className="progress-container px-3">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percent1}%`,
            background: "linear-gradient(to right, #FFC83D, #FF6A6A)",
          }}
        >
          <span className="progress-value">{value1}</span>
        </div>
        <div
          className="progress-bar right"
          style={{
            width: `${percent2}%`,
            backgroundColor: "#FF007F",
          }}
        >
          <span className="progress-value">{value2}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
