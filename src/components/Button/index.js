import PropTypes from "prop-types";
import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({
  title = "",
  onClick = () => {},
  type = BUTTON_TYPES.DEFAULT,
  disabled = false,
  children = null,
}) => {
  if (type === BUTTON_TYPES.SUBMIT) {
    return (
      <input
        type="submit"
        disabled={disabled}
        className="Button"
        data-testid="button-test-id"
        value={typeof children === "string" ? children : ""}
        onClick={(e) => onClick(e)}
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className="Button"
      data-testid="button-test-id"
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
