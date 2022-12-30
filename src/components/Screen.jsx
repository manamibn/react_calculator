import "./Screen.css";
import { ReactFontSizeByTextLength } from "react-font-size-by-text-length";

const Screen = ({ value }) => {
  return (
    <div className="screen">
      <ReactFontSizeByTextLength
        changePerChar={2}
        startAtChar={9}
        minPercent={40}
        maxPercent={80}
      >
        <span>{value}</span>
      </ReactFontSizeByTextLength>
    </div>
  );
};

export default Screen;
