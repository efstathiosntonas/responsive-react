"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBiggerThanLaptop = exports.isLaptopDevice = exports.isTabletDevice = exports.isMobileDevice = exports.getDeviceTypeInfo = exports.getWindowDimension = exports.IdMobileHeight = exports.IdDeviceBreakpointsByWidth = exports.DeviceWidthObject = void 0;
var DeviceWidthObject = {
  MobileSmall: {
    max: 320,
    min: 0
  },
  MobileMedium: {
    max: 375,
    min: 321
  },
  MobileLarge: {
    max: 767,
    min: 376
  },
  Tablet: {
    max: 991,
    min: 768
  },
  LaptopSmall: {
    max: 1024,
    min: 992
  },
  LaptopLarge: {
    max: 1440,
    min: 1025
  },
  LargerThanLaptop: {
    max: 2560,
    min: 1441
  },
  LargeScreenMax: {
    max: 999999,
    min: 2561
  }
};
exports.DeviceWidthObject = DeviceWidthObject;
var IdDeviceBreakpointsByWidth = {
  laptop_max: 1440,
  laptop_min: 992,
  tablet_min: 768,
  tablet_max: 991,
  mobile_max: 767,
  default_min: 768 // Unrecognized device

};
exports.IdDeviceBreakpointsByWidth = IdDeviceBreakpointsByWidth;
var IdMobileHeight = {
  mobileLandscape_min: 320,
  mobileLandscape_max: 425
};
exports.IdMobileHeight = IdMobileHeight;

var getWindowDimension = function getWindowDimension() {
  if (typeof window !== "undefined") {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return {
      width: width,
      height: height
    };
  }
};

exports.getWindowDimension = getWindowDimension;

var getDeviceTypeInfo = function getDeviceTypeInfo() {
  var windowDimension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getWindowDimension();
  var width = windowDimension.width,
      height = windowDimension.height;
  var buildDeviceDetails = {
    deviceType: "",
    deviceTypeVariant: "",
    orientation: "Portrait",
    width: width,
    height: height,
    isFallback: false
  }; //  Edge case

  var hasEdgeCase = handleExceptions(buildDeviceDetails, width, height);

  if (hasEdgeCase) {
    return hasEdgeCase;
  }

  if (height < width) {
    // Orientation is landscape
    buildDeviceDetails.orientation = "Landscape";

    if (height <= IdMobileHeight.mobileLandscape_max) {
      // Mobile (landscape)
      buildDeviceDetails.deviceType = "Mobile";

      for (var devc in DeviceWidthObject) {
        if (height <= DeviceWidthObject[devc].max && height >= DeviceWidthObject[devc].min) {
          buildDeviceDetails.deviceTypeVariant = devc;
          break;
        }
      }
    } else if (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min) {
      // Tablet (landscape)
      buildDeviceDetails.deviceType = "Tablet";
      buildDeviceDetails.deviceTypeVariant = "Tablet";
    } else if (width <= IdDeviceBreakpointsByWidth.laptop_max && width >= IdDeviceBreakpointsByWidth.laptop_min) {
      // Laptop (landscape)
      buildDeviceDetails.deviceType = "Laptop";

      for (var _devc in DeviceWidthObject) {
        if (width <= DeviceWidthObject[_devc].max && width >= DeviceWidthObject[_devc].min) {
          buildDeviceDetails.deviceTypeVariant = _devc;
          break;
        }
      }
    } else if (width > IdDeviceBreakpointsByWidth.laptop_max) {
      // Larger than Laptop (landscape)
      buildDeviceDetails.deviceType = "LargerThanLaptop";

      for (var _devc2 in DeviceWidthObject) {
        if (width <= DeviceWidthObject[_devc2].max && width >= DeviceWidthObject[_devc2].min) {
          buildDeviceDetails.deviceTypeVariant = _devc2;
          break;
        }
      }
    } else {
      // TODO: UNKNOWN realm
      buildDeviceDetails.deviceType = "Mobile";
      buildDeviceDetails.deviceTypeVariant = "MobileLarge";
      buildDeviceDetails.isFallback = true;
    }

    return buildDeviceDetails;
  } else {
    // Orientation is portrait
    buildDeviceDetails.orientation = "Portrait";

    for (var _devc3 in DeviceWidthObject) {
      if (width <= DeviceWidthObject[_devc3].max && width >= DeviceWidthObject[_devc3].min) {
        buildDeviceDetails.deviceTypeVariant = _devc3;
        break;
      }
    }

    if (width <= IdDeviceBreakpointsByWidth.laptop_max && width >= IdDeviceBreakpointsByWidth.laptop_min) {
      buildDeviceDetails.deviceType = "Laptop";
    }

    if (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min) {
      buildDeviceDetails.deviceType = "Tablet";
    }

    if (width <= IdDeviceBreakpointsByWidth.mobile_max) {
      buildDeviceDetails.deviceType = "Mobile";
    }

    if (width > IdDeviceBreakpointsByWidth.laptop_max) {
      buildDeviceDetails.deviceType = "LargerThanLaptop";
    }

    return buildDeviceDetails;
  }
};

exports.getDeviceTypeInfo = getDeviceTypeInfo;

var handleExceptions = function handleExceptions(buildDeviceDetails, width, height) {
  //  iPadPro
  if (width === 1024 && height === 1366) {
    buildDeviceDetails.deviceType = "Tablet";
    buildDeviceDetails.deviceTypeVariant = "iPadPro";
    buildDeviceDetails.orientation = "Portrait";
    return buildDeviceDetails;
  } else if (width === 1366 && height === 1024) {
    //  Edge case
    buildDeviceDetails.deviceType = "Tablet";
    buildDeviceDetails.deviceTypeVariant = "iPadPro";
    buildDeviceDetails.orientation = "Landscape";
    return buildDeviceDetails;
  }

  return undefined;
};

var isMobileDevice = function isMobileDevice() {
  var deviceInformation = getDeviceTypeInfo();
  return deviceInformation.deviceType === "Mobile";
};

exports.isMobileDevice = isMobileDevice;

var isTabletDevice = function isTabletDevice() {
  var deviceInformation = getDeviceTypeInfo();
  return deviceInformation.deviceType === "Tablet";
};

exports.isTabletDevice = isTabletDevice;

var isLaptopDevice = function isLaptopDevice() {
  var deviceInformation = getDeviceTypeInfo();
  return deviceInformation.deviceType === "Laptop";
};

exports.isLaptopDevice = isLaptopDevice;

var isBiggerThanLaptop = function isBiggerThanLaptop() {
  var deviceInformation = getDeviceTypeInfo();
  return deviceInformation.deviceType === "LargerThanLaptop";
};

exports.isBiggerThanLaptop = isBiggerThanLaptop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsUmVzcG9uc2l2ZS5qcyJdLCJuYW1lcyI6WyJEZXZpY2VXaWR0aE9iamVjdCIsIk1vYmlsZVNtYWxsIiwibWF4IiwibWluIiwiTW9iaWxlTWVkaXVtIiwiTW9iaWxlTGFyZ2UiLCJUYWJsZXQiLCJMYXB0b3BTbWFsbCIsIkxhcHRvcExhcmdlIiwiTGFyZ2VyVGhhbkxhcHRvcCIsIkxhcmdlU2NyZWVuTWF4IiwiSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgiLCJsYXB0b3BfbWF4IiwibGFwdG9wX21pbiIsInRhYmxldF9taW4iLCJ0YWJsZXRfbWF4IiwibW9iaWxlX21heCIsImRlZmF1bHRfbWluIiwiSWRNb2JpbGVIZWlnaHQiLCJtb2JpbGVMYW5kc2NhcGVfbWluIiwibW9iaWxlTGFuZHNjYXBlX21heCIsImdldFdpbmRvd0RpbWVuc2lvbiIsIndpbmRvdyIsIndpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJib2R5IiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJnZXREZXZpY2VUeXBlSW5mbyIsIndpbmRvd0RpbWVuc2lvbiIsImJ1aWxkRGV2aWNlRGV0YWlscyIsImRldmljZVR5cGUiLCJkZXZpY2VUeXBlVmFyaWFudCIsIm9yaWVudGF0aW9uIiwiaXNGYWxsYmFjayIsImhhc0VkZ2VDYXNlIiwiaGFuZGxlRXhjZXB0aW9ucyIsImRldmMiLCJ1bmRlZmluZWQiLCJpc01vYmlsZURldmljZSIsImRldmljZUluZm9ybWF0aW9uIiwiaXNUYWJsZXREZXZpY2UiLCJpc0xhcHRvcERldmljZSIsImlzQmlnZ2VyVGhhbkxhcHRvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLFdBQVcsRUFBRTtBQUFFQyxJQUFBQSxHQUFHLEVBQUUsR0FBUDtBQUFZQyxJQUFBQSxHQUFHLEVBQUU7QUFBakIs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RSxpQkFBbkIsR0FBdUMsU0FBdkM7QUFDQUYsSUFBQUEsa0JBQWtCLENBQUNHLFdBQW5CLEdBQWlDLFdBQWpDO0FBQ0EsV0FBT0gsa0JBQVA7QUFDRDs7QUFFRCxTQUFPUSxTQUFQO0FBQ0QsQ0FqQkQ7O0FBbUJPLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUNsQyxNQUFNQyxpQkFBaUIsR0FBR1osaUJBQWlCLEVBQTNDO0FBQ0EsU0FBT1ksaUJBQWlCLENBQUNULFVBQWxCLEtBQWlDLFFBQXhDO0FBQ0QsQ0FITTs7OztBQUtBLElBQU1VLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUNsQyxNQUFNRCxpQkFBaUIsR0FBR1osaUJBQWlCLEVBQTNDO0FBRUEsU0FBT1ksaUJBQWlCLENBQUNULFVBQWxCLEtBQWlDLFFBQXhDO0FBQ0QsQ0FKTTs7OztBQU1BLElBQU1XLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUNsQyxNQUFNRixpQkFBaUIsR0FBR1osaUJBQWlCLEVBQTNDO0FBRUEsU0FBT1ksaUJBQWlCLENBQUNULFVBQWxCLEtBQWlDLFFBQXhDO0FBQ0QsQ0FKTTs7OztBQU1BLElBQU1ZLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsR0FBTTtBQUN0QyxNQUFNSCxpQkFBaUIsR0FBR1osaUJBQWlCLEVBQTNDO0FBRUEsU0FBT1ksaUJBQWlCLENBQUNULFVBQWxCLEtBQWlDLGtCQUF4QztBQUNELENBSk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRGV2aWNlV2lkdGhPYmplY3QgPSB7XG4gIE1vYmlsZVNtYWxsOiB7IG1heDogMzIwLCBtaW46IDAgfSxcbiAgTW9iaWxlTWVkaXVtOiB7IG1heDogMzc1LCBtaW46IDMyMSB9LFxuICBNb2JpbGVMYXJnZTogeyBtYXg6IDc2NywgbWluOiAzNzYgfSxcbiAgVGFibGV0OiB7IG1heDogOTkxLCBtaW46IDc2OCB9LFxuICBMYXB0b3BTbWFsbDogeyBtYXg6IDEwMjQsIG1pbjogOTkyIH0sXG4gIExhcHRvcExhcmdlOiB7IG1heDogMTQ0MCwgbWluOiAxMDI1IH0sXG4gIExhcmdlclRoYW5MYXB0b3A6IHsgbWF4OiAyNTYwLCBtaW46IDE0NDEgfSxcbiAgTGFyZ2VTY3JlZW5NYXg6IHsgbWF4OiA5OTk5OTksIG1pbjogMjU2MSB9XG59O1xuXG5leHBvcnQgY29uc3QgSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGggPSB7XG4gIGxhcHRvcF9tYXg6IDE0NDAsXG4gIGxhcHRvcF9taW46IDk5MixcbiAgdGFibGV0X21pbjogNzY4LFxuICB0YWJsZXRfbWF4OiA5OTEsXG4gIG1vYmlsZV9tYXg6IDc2NyxcbiAgZGVmYXVsdF9taW46IDc2OCAvLyBVbnJlY29nbml6ZWQgZGV2aWNlXG59O1xuZXhwb3J0IGNvbnN0IElkTW9iaWxlSGVpZ2h0ID0ge1xuICBtb2JpbGVMYW5kc2NhcGVfbWluOiAzMjAsXG4gIG1vYmlsZUxhbmRzY2FwZV9tYXg6IDQyNVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFdpbmRvd0RpbWVuc2lvbiA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCB3aWR0aCA9XG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9XG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQgfTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGVJbmZvID0gKHdpbmRvd0RpbWVuc2lvbiA9IGdldFdpbmRvd0RpbWVuc2lvbigpKSA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gd2luZG93RGltZW5zaW9uO1xuXG4gIGNvbnN0IGJ1aWxkRGV2aWNlRGV0YWlscyA9IHtcbiAgICBkZXZpY2VUeXBlOiBcIlwiLFxuICAgIGRldmljZVR5cGVWYXJpYW50OiBcIlwiLFxuICAgIG9yaWVudGF0aW9uOiBcIlBvcnRyYWl0XCIsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGlzRmFsbGJhY2s6IGZhbHNlXG4gIH07XG5cbiAgLy8gIEVkZ2UgY2FzZVxuICBjb25zdCBoYXNFZGdlQ2FzZSA9IGhhbmRsZUV4Y2VwdGlvbnMoYnVpbGREZXZpY2VEZXRhaWxzLCB3aWR0aCwgaGVpZ2h0KTtcbiAgaWYgKGhhc0VkZ2VDYXNlKSB7XG4gICAgcmV0dXJuIGhhc0VkZ2VDYXNlO1xuICB9XG5cbiAgaWYgKGhlaWdodCA8IHdpZHRoKSB7XG4gICAgLy8gT3JpZW50YXRpb24gaXMgbGFuZHNjYXBlXG4gICAgYnVpbGREZXZpY2VEZXRhaWxzLm9yaWVudGF0aW9uID0gXCJMYW5kc2NhcGVcIjtcbiAgICBpZiAoaGVpZ2h0IDw9IElkTW9iaWxlSGVpZ2h0Lm1vYmlsZUxhbmRzY2FwZV9tYXgpIHtcbiAgICAgIC8vIE1vYmlsZSAobGFuZHNjYXBlKVxuICAgICAgYnVpbGREZXZpY2VEZXRhaWxzLmRldmljZVR5cGUgPSBcIk1vYmlsZVwiO1xuXG4gICAgICBmb3IgKGNvbnN0IGRldmMgaW4gRGV2aWNlV2lkdGhPYmplY3QpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGhlaWdodCA8PSBEZXZpY2VXaWR0aE9iamVjdFtkZXZjXS5tYXggJiZcbiAgICAgICAgICBoZWlnaHQgPj0gRGV2aWNlV2lkdGhPYmplY3RbZGV2Y10ubWluXG4gICAgICAgICkge1xuICAgICAgICAgIGJ1aWxkRGV2aWNlRGV0YWlscy5kZXZpY2VUeXBlVmFyaWFudCA9IGRldmM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgd2lkdGggPD0gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgudGFibGV0X21heCAmJlxuICAgICAgd2lkdGggPj0gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgudGFibGV0X21pblxuICAgICkge1xuICAgICAgLy8gVGFibGV0IChsYW5kc2NhcGUpXG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZSA9IFwiVGFibGV0XCI7XG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZVZhcmlhbnQgPSBcIlRhYmxldFwiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB3aWR0aCA8PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC5sYXB0b3BfbWF4ICYmXG4gICAgICB3aWR0aCA+PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC5sYXB0b3BfbWluXG4gICAgKSB7XG4gICAgICAvLyBMYXB0b3AgKGxhbmRzY2FwZSlcbiAgICAgIGJ1aWxkRGV2aWNlRGV0YWlscy5kZXZpY2VUeXBlID0gXCJMYXB0b3BcIjtcbiAgICAgIGZvciAoY29uc3QgZGV2YyBpbiBEZXZpY2VXaWR0aE9iamVjdCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgd2lkdGggPD0gRGV2aWNlV2lkdGhPYmplY3RbZGV2Y10ubWF4ICYmXG4gICAgICAgICAgd2lkdGggPj0gRGV2aWNlV2lkdGhPYmplY3RbZGV2Y10ubWluXG4gICAgICAgICkge1xuICAgICAgICAgIGJ1aWxkRGV2aWNlRGV0YWlscy5kZXZpY2VUeXBlVmFyaWFudCA9IGRldmM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdpZHRoID4gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgubGFwdG9wX21heCkge1xuICAgICAgLy8gTGFyZ2VyIHRoYW4gTGFwdG9wIChsYW5kc2NhcGUpXG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZSA9IFwiTGFyZ2VyVGhhbkxhcHRvcFwiO1xuICAgICAgZm9yIChjb25zdCBkZXZjIGluIERldmljZVdpZHRoT2JqZWN0KSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB3aWR0aCA8PSBEZXZpY2VXaWR0aE9iamVjdFtkZXZjXS5tYXggJiZcbiAgICAgICAgICB3aWR0aCA+PSBEZXZpY2VXaWR0aE9iamVjdFtkZXZjXS5taW5cbiAgICAgICAgKSB7XG4gICAgICAgICAgYnVpbGREZXZpY2VEZXRhaWxzLmRldmljZVR5cGVWYXJpYW50ID0gZGV2YztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBVTktOT1dOIHJlYWxtXG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZSA9IFwiTW9iaWxlXCI7XG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZVZhcmlhbnQgPSBcIk1vYmlsZUxhcmdlXCI7XG4gICAgICBidWlsZERldmljZURldGFpbHMuaXNGYWxsYmFjayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBidWlsZERldmljZURldGFpbHM7XG4gIH0gZWxzZSB7XG4gICAgLy8gT3JpZW50YXRpb24gaXMgcG9ydHJhaXRcbiAgICBidWlsZERldmljZURldGFpbHMub3JpZW50YXRpb24gPSBcIlBvcnRyYWl0XCI7XG4gICAgZm9yIChjb25zdCBkZXZjIGluIERldmljZVdpZHRoT2JqZWN0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHdpZHRoIDw9IERldmljZVdpZHRoT2JqZWN0W2RldmNdLm1heCAmJlxuICAgICAgICB3aWR0aCA+PSBEZXZpY2VXaWR0aE9iamVjdFtkZXZjXS5taW5cbiAgICAgICkge1xuICAgICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZVZhcmlhbnQgPSBkZXZjO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgd2lkdGggPD0gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgubGFwdG9wX21heCAmJlxuICAgICAgd2lkdGggPj0gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgubGFwdG9wX21pblxuICAgICkge1xuICAgICAgYnVpbGREZXZpY2VEZXRhaWxzLmRldmljZVR5cGUgPSBcIkxhcHRvcFwiO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB3aWR0aCA8PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC50YWJsZXRfbWF4ICYmXG4gICAgICB3aWR0aCA+PSBJZERldmljZUJyZWFrcG9pbnRzQnlXaWR0aC50YWJsZXRfbWluXG4gICAgKSB7XG4gICAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZSA9IFwiVGFibGV0XCI7XG4gICAgfVxuXG4gICAgaWYgKHdpZHRoIDw9IElkRGV2aWNlQnJlYWtwb2ludHNCeVdpZHRoLm1vYmlsZV9tYXgpIHtcbiAgICAgIGJ1aWxkRGV2aWNlRGV0YWlscy5kZXZpY2VUeXBlID0gXCJNb2JpbGVcIjtcbiAgICB9XG4gICAgaWYgKHdpZHRoID4gSWREZXZpY2VCcmVha3BvaW50c0J5V2lkdGgubGFwdG9wX21heCkge1xuICAgICAgYnVpbGREZXZpY2VEZXRhaWxzLmRldmljZVR5cGUgPSBcIkxhcmdlclRoYW5MYXB0b3BcIjtcbiAgICB9XG4gICAgcmV0dXJuIGJ1aWxkRGV2aWNlRGV0YWlscztcbiAgfVxufTtcblxuY29uc3QgaGFuZGxlRXhjZXB0aW9ucyA9IChidWlsZERldmljZURldGFpbHMsIHdpZHRoLCBoZWlnaHQpID0+IHtcbiAgLy8gIGlQYWRQcm9cbiAgaWYgKHdpZHRoID09PSAxMDI0ICYmIGhlaWdodCA9PT0gMTM2Nikge1xuICAgIGJ1aWxkRGV2aWNlRGV0YWlscy5kZXZpY2VUeXBlID0gXCJUYWJsZXRcIjtcbiAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZVZhcmlhbnQgPSBcImlQYWRQcm9cIjtcbiAgICBidWlsZERldmljZURldGFpbHMub3JpZW50YXRpb24gPSBcIlBvcnRyYWl0XCI7XG5cbiAgICByZXR1cm4gYnVpbGREZXZpY2VEZXRhaWxzO1xuICB9IGVsc2UgaWYgKHdpZHRoID09PSAxMzY2ICYmIGhlaWdodCA9PT0gMTAyNCkge1xuICAgIC8vICBFZGdlIGNhc2VcbiAgICBidWlsZERldmljZURldGFpbHMuZGV2aWNlVHlwZSA9IFwiVGFibGV0XCI7XG4gICAgYnVpbGREZXZpY2VEZXRhaWxzLmRldmljZVR5cGVWYXJpYW50ID0gXCJpUGFkUHJvXCI7XG4gICAgYnVpbGREZXZpY2VEZXRhaWxzLm9yaWVudGF0aW9uID0gXCJMYW5kc2NhcGVcIjtcbiAgICByZXR1cm4gYnVpbGREZXZpY2VEZXRhaWxzO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc01vYmlsZURldmljZSA9ICgpID0+IHtcbiAgY29uc3QgZGV2aWNlSW5mb3JtYXRpb24gPSBnZXREZXZpY2VUeXBlSW5mbygpO1xuICByZXR1cm4gZGV2aWNlSW5mb3JtYXRpb24uZGV2aWNlVHlwZSA9PT0gXCJNb2JpbGVcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1RhYmxldERldmljZSA9ICgpID0+IHtcbiAgY29uc3QgZGV2aWNlSW5mb3JtYXRpb24gPSBnZXREZXZpY2VUeXBlSW5mbygpO1xuXG4gIHJldHVybiBkZXZpY2VJbmZvcm1hdGlvbi5kZXZpY2VUeXBlID09PSBcIlRhYmxldFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTGFwdG9wRGV2aWNlID0gKCkgPT4ge1xuICBjb25zdCBkZXZpY2VJbmZvcm1hdGlvbiA9IGdldERldmljZVR5cGVJbmZvKCk7XG5cbiAgcmV0dXJuIGRldmljZUluZm9ybWF0aW9uLmRldmljZVR5cGUgPT09IFwiTGFwdG9wXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaXNCaWdnZXJUaGFuTGFwdG9wID0gKCkgPT4ge1xuICBjb25zdCBkZXZpY2VJbmZvcm1hdGlvbiA9IGdldERldmljZVR5cGVJbmZvKCk7XG5cbiAgcmV0dXJuIGRldmljZUluZm9ybWF0aW9uLmRldmljZVR5cGUgPT09IFwiTGFyZ2VyVGhhbkxhcHRvcFwiO1xufTtcbiJdfQ==