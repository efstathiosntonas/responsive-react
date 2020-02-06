"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Responsive = void 0;

var _react = _interopRequireDefault(require("react"));

var _utilResponsive = require("./utilResponsive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _getWindowDimension = (0, _utilResponsive.getWindowDimension)(),
    width = _getWindowDimension.width,
    height = _getWindowDimension.height;

var Responsive =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Responsive, _React$PureComponent);

  function Responsive() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Responsive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Responsive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      width: width,
      height: height
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          displayIn = _this$props.displayIn;
      var _this$state = _this.state,
          width = _this$state.width,
          height = _this$state.height;
      var dispInArr = displayIn.map(function (val) {
        return val.toLowerCase();
      });

      var shouldRenderChildren = _this.shouldRender(dispInArr, width, height);

      return _react["default"].createElement(_react["default"].Fragment, null, shouldRenderChildren ? children : null);
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", function () {
      var _getWindowDimension2 = (0, _utilResponsive.getWindowDimension)(),
          width = _getWindowDimension2.width,
          height = _getWindowDimension2.height;

      _this.setState({
        width: width,
        height: height
      });
    });

    _defineProperty(_assertThisInitialized(_this), "shouldRender", function (display, width, height) {
      if (display.indexOf("laptop") !== -1 && width > height && width >= _utilResponsive.IdDeviceBreakpointsByWidth.laptop_min) {
        //  always landscape
        return true;
      }

      if (display.indexOf("tablet") !== -1) {
        if (width <= _utilResponsive.IdDeviceBreakpointsByWidth.tablet_max && width >= _utilResponsive.IdDeviceBreakpointsByWidth.tablet_min) {
          return true;
        } //  Cater iPad pro portrait (ONLY)


        if (width === 1024 && height === 1366) {
          return true;
        }
      } // For mobile regardless of orientation


      if (display.indexOf("mobile") !== -1 && width <= _utilResponsive.IdDeviceBreakpointsByWidth.mobile_max) {
        return true;
      }

      if (display.indexOf("mobileportrait") !== -1 && width <= _utilResponsive.IdDeviceBreakpointsByWidth.mobile_max && height >= _utilResponsive.IdMobileHeight.mobileLandscape_max) {
        return true;
      }

      return !!(display.indexOf("mobilelandscape") !== -1 && width <= _utilResponsive.IdDeviceBreakpointsByWidth.mobile_max && height <= _utilResponsive.IdMobileHeight.mobileLandscape_min);
    });

    return _this;
  }

  _createClass(Responsive, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.handleResize, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize, false);
    }
  }]);

  return Responsive;
}(_react["default"].PureComponent);

exports.Responsive = Responsive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZXNwb25zaXZlLmpzIl0sIm5hbWVzIjpbIndpZHRoIiwiaGVpZ2h0IiwiUmVzcG9uc2l2ZSIsInByb3BzIiwiY2hpbGRyZW4iLCJkaXNwbGF5SW4iLCJzdGF0ZSIsImRpc3BJbkFyciIsIm1hcCIsInZhbCIsInRvTG93ZXJDYXNlIiwic2hvdWxkUmVuZGVyQ2hpbGRyZW4iLCJzaG91bGRSZW5kZXIiLCJzZXRTdGF0ZSIsImRpc3BsYXkiLCJpbmRleE9mIiwiSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgiLCJsYXB0b3BfbWluIiwidGFibGV0X21heCIsInRhYmxldF9taW4iLCJtb2JpbGVfbWF4IiwiSWRNb2JpbGVIZWlnaHQiLCJtb2JpbGVMYW5kc2NhcGVfbWF4IiwibW9iaWxlTGFuZHNjYXBlX21pbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVSZXNpemUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFNMEIseUM7SUFBbEJBLEssdUJBQUFBLEs7SUFBT0MsTSx1QkFBQUEsTTs7SUFFRkMsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzREQUNIO0FBQUVGLE1BQUFBLEtBQUssRUFBTEEsS0FBRjtBQUFTQyxNQUFBQSxNQUFNLEVBQU5BO0FBQVQsSzs7NkRBU0MsWUFBTTtBQUFBLHdCQUNtQixNQUFLRSxLQUR4QjtBQUFBLFVBQ0xDLFFBREssZUFDTEEsUUFESztBQUFBLFVBQ0tDLFNBREwsZUFDS0EsU0FETDtBQUFBLHdCQUVhLE1BQUtDLEtBRmxCO0FBQUEsVUFFTE4sS0FGSyxlQUVMQSxLQUZLO0FBQUEsVUFFRUMsTUFGRixlQUVFQSxNQUZGO0FBSWIsVUFBTU0sU0FBUyxHQUFHRixTQUFTLENBQUNHLEdBQVYsQ0FBYyxVQUFBQyxHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDQyxXQUFKLEVBQUo7QUFBQSxPQUFqQixDQUFsQjs7QUFDQSxVQUFNQyxvQkFBb0IsR0FBRyxNQUFLQyxZQUFMLENBQWtCTCxTQUFsQixFQUE2QlAsS0FBN0IsRUFBb0NDLE1BQXBDLENBQTdCOztBQUVBLGFBQ0UsZ0NBQUMsaUJBQUQsQ0FBTyxRQUFQLFFBQWlCVSxvQkFBb0IsR0FBR1AsUUFBSCxHQUFjLElBQW5ELENBREY7QUFHRCxLOzttRUFFYyxZQUFNO0FBQUEsaUNBQ08seUNBRFA7QUFBQSxVQUNYSixLQURXLHdCQUNYQSxLQURXO0FBQUEsVUFDSkMsTUFESSx3QkFDSkEsTUFESTs7QUFFbkIsWUFBS1ksUUFBTCxDQUFjO0FBQUViLFFBQUFBLEtBQUssRUFBTEEsS0FBRjtBQUFTQyxRQUFBQSxNQUFNLEVBQU5BO0FBQVQsT0FBZDtBQUNELEs7O21FQUVjLFVBQUNhLE9BQUQsRUFBVWQsS0FBVixFQUFpQkMsTUFBakIsRUFBNEI7QUFDekMsVUFDRWEsT0FBTyxDQUFDQyxPQUFSLENBQWdCLFFBQWhCLE1BQThCLENBQUMsQ0FBL0IsSUFDQWYsS0FBSyxHQUFHQyxNQURSLElBRUFELEtBQUssSUFBSWdCLDJDQUEyQkMsVUFIdEMsRUFJRTtBQUNBO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSUgsT0FBTyxDQUFDQyxPQUFSLENBQWdCLFFBQWhCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0M7QUFDcEMsWUFDRWYsS0FBSyxJQUFJZ0IsMkNBQTJCRSxVQUFwQyxJQUNBbEIsS0FBSyxJQUFJZ0IsMkNBQTJCRyxVQUZ0QyxFQUdFO0FBQ0EsaUJBQU8sSUFBUDtBQUNELFNBTm1DLENBT3BDOzs7QUFDQSxZQUFJbkIsS0FBSyxLQUFLLElBQVYsSUFBa0JDLE1BQU0sS0FBSyxJQUFqQyxFQUF1QztBQUNyQyxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQXJCd0MsQ0F1QnpDOzs7QUFDQSxVQUNFYSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsUUFBaEIsTUFBOEIsQ0FBQyxDQUEvQixJQUNBZixLQUFLLElBQUlnQiwyQ0FBMkJJLFVBRnRDLEVBR0U7QUFDQSxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUNFTixPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsZ0JBQWhCLE1BQXNDLENBQUMsQ0FBdkMsSUFDQWYsS0FBSyxJQUFJZ0IsMkNBQTJCSSxVQURwQyxJQUVFbkIsTUFBTSxJQUFJb0IsK0JBQWVDLG1CQUg3QixFQUlFO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTyxDQUFDLEVBQ05SLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixpQkFBaEIsTUFBdUMsQ0FBQyxDQUF4QyxJQUNBZixLQUFLLElBQUlnQiwyQ0FBMkJJLFVBRHBDLElBRUVuQixNQUFNLElBQUlvQiwrQkFBZUUsbUJBSHJCLENBQVI7QUFLRCxLOzs7Ozs7O3dDQXJFbUI7QUFDbEJDLE1BQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0MsWUFBdkMsRUFBcUQsS0FBckQ7QUFDRDs7OzJDQUVzQjtBQUNyQkYsTUFBQUEsTUFBTSxDQUFDRyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLRCxZQUExQyxFQUF3RCxLQUF4RDtBQUNEOzs7O0VBUjZCRSxrQkFBTUMsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIGdldFdpbmRvd0RpbWVuc2lvbixcbiAgSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgsXG4gIElkTW9iaWxlSGVpZ2h0XG59IGZyb20gXCIuL3V0aWxSZXNwb25zaXZlXCI7XG5cbmNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZ2V0V2luZG93RGltZW5zaW9uKCk7XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zaXZlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRlID0geyB3aWR0aCwgaGVpZ2h0IH07XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuaGFuZGxlUmVzaXplLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGRpc3BsYXlJbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBkaXNwSW5BcnIgPSBkaXNwbGF5SW4ubWFwKHZhbCA9PiB2YWwudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2hvdWxkUmVuZGVyQ2hpbGRyZW4gPSB0aGlzLnNob3VsZFJlbmRlcihkaXNwSW5BcnIsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD57c2hvdWxkUmVuZGVyQ2hpbGRyZW4gPyBjaGlsZHJlbiA6IG51bGx9PC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9O1xuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGdldFdpbmRvd0RpbWVuc2lvbigpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB3aWR0aCwgaGVpZ2h0IH0pO1xuICB9O1xuXG4gIHNob3VsZFJlbmRlciA9IChkaXNwbGF5LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XG4gICAgaWYgKFxuICAgICAgZGlzcGxheS5pbmRleE9mKFwibGFwdG9wXCIpICE9PSAtMSAmJlxuICAgICAgd2lkdGggPiBoZWlnaHQgJiZcbiAgICAgIHdpZHRoID49IElkRGV2aWNlQnJlYWtwb2ludHNCeVdpZHRoLmxhcHRvcF9taW5cbiAgICApIHtcbiAgICAgIC8vICBhbHdheXMgbGFuZHNjYXBlXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZGlzcGxheS5pbmRleE9mKFwidGFibGV0XCIpICE9PSAtMSkge1xuICAgICAgaWYgKFxuICAgICAgICB3aWR0aCA8PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC50YWJsZXRfbWF4ICYmXG4gICAgICAgIHdpZHRoID49IElkRGV2aWNlQnJlYWtwb2ludHNCeVdpZHRoLnRhYmxldF9taW5cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vICBDYXRlciBpUGFkIHBybyBwb3J0cmFpdCAoT05MWSlcbiAgICAgIGlmICh3aWR0aCA9PT0gMTAyNCAmJiBoZWlnaHQgPT09IDEzNjYpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIG1vYmlsZSByZWdhcmRsZXNzIG9mIG9yaWVudGF0aW9uXG4gICAgaWYgKFxuICAgICAgZGlzcGxheS5pbmRleE9mKFwibW9iaWxlXCIpICE9PSAtMSAmJlxuICAgICAgd2lkdGggPD0gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgubW9iaWxlX21heFxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZGlzcGxheS5pbmRleE9mKFwibW9iaWxlcG9ydHJhaXRcIikgIT09IC0xICYmXG4gICAgICB3aWR0aCA8PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC5tb2JpbGVfbWF4ICYmXG4gICAgICAgIGhlaWdodCA+PSBJZE1vYmlsZUhlaWdodC5tb2JpbGVMYW5kc2NhcGVfbWF4XG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEoXG4gICAgICBkaXNwbGF5LmluZGV4T2YoXCJtb2JpbGVsYW5kc2NhcGVcIikgIT09IC0xICYmXG4gICAgICB3aWR0aCA8PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC5tb2JpbGVfbWF4ICYmXG4gICAgICAgIGhlaWdodCA8PSBJZE1vYmlsZUhlaWdodC5tb2JpbGVMYW5kc2NhcGVfbWluXG4gICAgKTtcbiAgfTtcbn1cbiJdfQ==