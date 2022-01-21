import "./slider.css";

function Slider({ tabNumber, setTabNumber }) {
  const getClass = () => {
    let className = "slider__border ";
    if (tabNumber === 0) className += "";
    else if (tabNumber === 1) className += "slider__border--middle";
    else className += "slider__border--right";

    return className;
  };
  return (
    <div className="slider">
      <div className="slider__options">
        <h2 className="slider__option search" onClick={() => setTabNumber(0)}>
          search
        </h2>
        <h2
          className="slider__option requests-received"
          onClick={() => setTabNumber(1)}
        >
          received
        </h2>
        <h2
          className="slider__option requests-sent"
          onClick={() => setTabNumber(2)}
        >
          sent
        </h2>
      </div>
      <p className={getClass()}></p>
    </div>
  );
}

export default Slider;
