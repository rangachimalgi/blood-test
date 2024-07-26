import React from "react";
import "../Styles/Highlight.css";

const Highlight = ({ number }) => {
  return (
    <div className="highlight">
      <div className="highlight-number">{number}</div>
      <div className="highlight-text">Tests</div>
    </div>
  );
};

export default Highlight;
