"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var React = require('react');
var PropTypes = require('prop-types');
var createManager = require('./createManager');
var ManagerContext = require('./ManagerContext');
var _require = require("./propTypes"),
  refType = _require.refType;
var specialAssign = require('./specialAssign');
var checkedProps = {
  children: PropTypes.node.isRequired,
  forwardedRef: refType,
  onMenuToggle: PropTypes.func,
  onSelection: PropTypes.func,
  closeOnSelection: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  tag: PropTypes.string
};
var managerOptionsFromProps = function managerOptionsFromProps(props) {
  return {
    onMenuToggle: props.onMenuToggle,
    onSelection: props.onSelection,
    closeOnSelection: props.closeOnSelection,
    closeOnBlur: props.closeOnBlur,
    id: props.id
  };
};
var AriaMenuButtonWrapper = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AriaMenuButtonWrapper, _React$Component);
  function AriaMenuButtonWrapper(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.manager = createManager(managerOptionsFromProps(props));
    return _this;
  }
  var _proto = AriaMenuButtonWrapper.prototype;
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.manager.updateOptions(managerOptionsFromProps(this.props));
  };
  _proto.render = function render() {
    var wrapperProps = {};
    specialAssign(wrapperProps, this.props, checkedProps);
    return React.createElement(ManagerContext.Provider, {
      value: this.manager
    }, React.createElement(this.props.tag, wrapperProps, this.props.children));
  };
  return AriaMenuButtonWrapper;
}(React.Component);
AriaMenuButtonWrapper.propTypes = checkedProps;
AriaMenuButtonWrapper.defaultProps = {
  tag: 'div'
};
module.exports = React.forwardRef(function (props, ref) {
  var wrapperProps = {
    forwardedRef: ref
  };
  specialAssign(wrapperProps, props, {
    children: checkedProps.children,
    forwardedRef: checkedProps.forwardedRef
  });
  specialAssign(wrapperProps, {
    forwardedRef: ref
  });
  return React.createElement(AriaMenuButtonWrapper, wrapperProps, props.children);
});