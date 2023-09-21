"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var React = require('react');
var PropTypes = require('prop-types');
var ManagerContext = require('./ManagerContext');
var _require = require("./propTypes"),
  refType = _require.refType;
var specialAssign = require('./specialAssign');
var checkedProps = {
  ambManager: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  forwardedRef: refType,
  tag: PropTypes.string
};

// List retrieved from https://www.w3schools.com/tags/att_disabled.asp
var disabledSupportedTags = function disabledSupportedTags() {
  return ['button', 'fieldset', 'input', 'optgroup', 'option', 'select', 'textarea'];
};
var AriaMenuButtonButton = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AriaMenuButtonButton, _React$Component);
  function AriaMenuButtonButton() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.ref = React.createRef();
    _this.handleKeyDown = function (event) {
      if (_this.props.disabled) return;
      var ambManager = _this.props.ambManager;
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!ambManager.isOpen) {
            ambManager.openMenu();
          } else {
            ambManager.focusItem(0);
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          ambManager.toggleMenu();
          break;
        case 'Escape':
          ambManager.handleMenuKey(event);
          break;
        default:
          // (Potential) letter keys
          ambManager.handleButtonNonArrowKey(event);
      }
    };
    _this.handleClick = function () {
      if (_this.props.disabled) return;
      _this.props.ambManager.toggleMenu({}, {
        focusMenu: false
      });
    };
    _this.setRef = function (instance) {
      _this.ref.current = instance;
      if (typeof _this.props.forwardedRef === "function") {
        _this.props.forwardedRef(instance);
      } else if (_this.props.forwardedRef) {
        _this.props.forwardedRef.current = instance;
      }
    };
    return _this;
  }
  var _proto = AriaMenuButtonButton.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.props.ambManager.button = this;
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.ambManager.destroy();
  };
  _proto.render = function render() {
    var props = this.props;
    var ambManager = this.props.ambManager;
    var buttonProps = {
      // "The menu button itself has a role of button."
      role: 'button',
      tabIndex: props.disabled ? '' : '0',
      // "The menu button has an aria-haspopup property, set to true."
      'aria-haspopup': true,
      'aria-expanded': ambManager.isOpen,
      'aria-disabled': props.disabled,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick
    };
    var reserved = {};
    specialAssign(reserved, checkedProps);
    // The disabled property should be passed down to the Button element
    // if the tag has support for disabled attribute. So it needs to be removed
    // from the reserved property object
    if (disabledSupportedTags().indexOf(props.tag) >= 0) {
      delete reserved.disabled;
    }
    if (ambManager.options.closeOnBlur) {
      buttonProps.onBlur = ambManager.handleBlur;
    }
    specialAssign(buttonProps, props, reserved);
    specialAssign(buttonProps, {
      ref: this.setRef
    });
    return React.createElement(props.tag, buttonProps, props.children);
  };
  return AriaMenuButtonButton;
}(React.Component);
AriaMenuButtonButton.propTypes = checkedProps;
AriaMenuButtonButton.defaultProps = {
  tag: 'span'
};
module.exports = React.forwardRef(function (props, ref) {
  return React.createElement(ManagerContext.Consumer, null, function (ambManager) {
    var buttonProps = {
      ambManager: ambManager,
      forwardedRef: ref
    };
    specialAssign(buttonProps, props, {
      ambManager: checkedProps.ambManager,
      children: checkedProps.children,
      forwardedRef: checkedProps.forwardedRef
    });
    return React.createElement(AriaMenuButtonButton, buttonProps, props.children);
  });
});