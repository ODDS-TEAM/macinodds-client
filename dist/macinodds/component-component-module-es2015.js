(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["component-component-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/component/menu-add-device/menu-add-device.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/component/menu-add-device/menu-add-device.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n\n<head>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n\n<body>\n\n  <div class=\"container\">\n    <div style=\"text-align:center\">\n      <br>\n\n      <h1>\n        Welcome to <span class=\"font-weight-bold\" style=\"color:#0b98d5\">MacinOdds</span>\n      </h1>\n      <div class=\"card bg-light \" style=\"max-width: 100%;\">\n        <div class=\"card-header mb-3 font-weight-bold\">REGISTER DEVICE</div>\n        <div class=\"card-body\">\n          <div class=\"form-group text-left\">\n            <label for=\"name\">Device's Name:</label>\n            <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Your device name..\">\n          </div>\n          <div class=\"form-group text-left\">\n            <label for=\"serial\" class=\"text-left\">Serial:</label>\n            <input type=\"text\" id=\"serial\" name=\"Serial\" placeholder=\"Your serial..\">\n          </div>\n          <div class=\"form-group text-left\">\n            <label for=\"spec\">Specification:</label>\n            <textarea rows=\"5\" id=\"spec\" name=\"Spec\" placeholder=\"Your device specification..\"></textarea>\n          </div>\n          <div class=\"form-group text-left\">\n            <label for=\"img\">Image:&nbsp;&nbsp;</label>\n            <input type=\"file\" name=\"pic\" accept=\"image/*\">\n          </div>\n          <div class=\"form-group text-left\">\n            <label for=\"img\">Status:&nbsp;&nbsp;</label>\n            <input type=\"radio\" name=\"status\" value=\"Avilible\"> <span>&nbsp;&nbsp;Avilible </span> &nbsp;\n            <input type=\"radio\" name=\"status\" value=\"Unavilible\"> <span>&nbsp;&nbsp;Unavilible </span>\n          </div>\n\n\n          <div class=\"form-group text-left\">\n            <label for=\"holder\" class=\"text-left\">Holder:</label>\n            <input type=\"text\" id=\"holder\" name=\"Holder\" placeholder=\"Your name..\">\n          </div>\n\n          <div class=\"form-group text-right\">\n              <button type=\"button\" class=\"btn btn-success\">Save</button>&nbsp;&nbsp;\n              <button type=\"button\" class=\"btn btn-danger\">Cancel</button>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n\n</html>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/component/menu-view-admin/menu-view-admin.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/component/menu-view-admin/menu-view-admin.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  menu-view-admin works!\n</p>\n"

/***/ }),

/***/ "./src/app/component/component-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/component/component-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ComponentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentRoutingModule", function() { return ComponentRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _menu_add_device_menu_add_device_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-add-device/menu-add-device.component */ "./src/app/component/menu-add-device/menu-add-device.component.ts");
/* harmony import */ var _menu_view_admin_menu_view_admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-view-admin/menu-view-admin.component */ "./src/app/component/menu-view-admin/menu-view-admin.component.ts");





const routes = [
    { path: '', redirectTo: 'menu-add-device', pathMatch: 'full' },
    { path: 'menu-add-device', component: _menu_add_device_menu_add_device_component__WEBPACK_IMPORTED_MODULE_3__["MenuAddDeviceComponent"] },
    { path: 'menu-view-admin', component: _menu_view_admin_menu_view_admin_component__WEBPACK_IMPORTED_MODULE_4__["MenuViewAdminComponent"] }
];
let ComponentRoutingModule = class ComponentRoutingModule {
};
ComponentRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ComponentRoutingModule);



/***/ }),

/***/ "./src/app/component/component.module.ts":
/*!***********************************************!*\
  !*** ./src/app/component/component.module.ts ***!
  \***********************************************/
/*! exports provided: ComponentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentModule", function() { return ComponentModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _component_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component-routing.module */ "./src/app/component/component-routing.module.ts");
/* harmony import */ var _menu_add_device_menu_add_device_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-add-device/menu-add-device.component */ "./src/app/component/menu-add-device/menu-add-device.component.ts");
/* harmony import */ var _menu_view_admin_menu_view_admin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu-view-admin/menu-view-admin.component */ "./src/app/component/menu-view-admin/menu-view-admin.component.ts");






let ComponentModule = class ComponentModule {
};
ComponentModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _menu_add_device_menu_add_device_component__WEBPACK_IMPORTED_MODULE_4__["MenuAddDeviceComponent"],
            _menu_view_admin_menu_view_admin_component__WEBPACK_IMPORTED_MODULE_5__["MenuViewAdminComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _component_routing_module__WEBPACK_IMPORTED_MODULE_3__["ComponentRoutingModule"]
        ]
    })
], ComponentModule);



/***/ }),

/***/ "./src/app/component/menu-add-device/menu-add-device.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/component/menu-add-device/menu-add-device.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n    box-sizing: border-box;\n  }\n  \n  body{\n    margin-left: 10px;\n  }\n  \n  input[type=text], select, textarea {\n    width: 100%;\n    padding: 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    resize: vertical;\n  }\n  \n  label {\n    padding: 12px 12px 12px 0;\n    display: inline-block;\n  }\n  \n  input[type=submit] {\n    background-color: #3f51b5;\n    color: white;\n    padding: 12px 20px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    float: right;\n  }\n  \n  input[type=submit]:hover {\n    background-color: #3f51b5;\n  }\n  \n  .container {\n    border-radius: 5px;\n    /* background-color: #f2f2f2; */\n    /* background-color:white; */\n    padding: 20px;\n  }\n  \n  .col-25 {\n    float: left;\n    width: 25%;\n    margin-top: 6px;\n  }\n  \n  .col-75 {\n    float: left;\n    width: 75%;\n    margin-top: 6px;\n  }\n  \n  /* Clear floats after the columns */\n  \n  .row:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n  \n  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */\n  \n  @media screen and (max-width: 600px) {\n    .col-25, .col-75, input[type=submit] {\n      width: 100%;\n      margin-top: 0;\n    }\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L21lbnUtYWRkLWRldmljZS9tZW51LWFkZC1kZXZpY2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsWUFBWTtFQUNkOztFQUVBO0lBQ0UseUJBQXlCO0VBQzNCOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLCtCQUErQjtJQUMvQiw0QkFBNEI7SUFDNUIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsV0FBVztJQUNYLFVBQVU7SUFDVixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsV0FBVztJQUNYLFVBQVU7SUFDVixlQUFlO0VBQ2pCOztFQUVBLG1DQUFtQzs7RUFDbkM7SUFDRSxXQUFXO0lBQ1gsY0FBYztJQUNkLFdBQVc7RUFDYjs7RUFFQSwrSUFBK0k7O0VBQy9JO0lBQ0U7TUFDRSxXQUFXO01BQ1gsYUFBYTtJQUNmO0VBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvbWVudS1hZGQtZGV2aWNlL21lbnUtYWRkLWRldmljZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuICBcbiAgYm9keXtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgfVxuICBcbiAgaW5wdXRbdHlwZT10ZXh0XSwgc2VsZWN0LCB0ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICB9XG4gIFxuICBsYWJlbCB7XG4gICAgcGFkZGluZzogMTJweCAxMnB4IDEycHggMDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbiAgXG4gIGlucHV0W3R5cGU9c3VibWl0XSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNmNTFiNTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgcGFkZGluZzogMTJweCAyMHB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiByaWdodDtcbiAgfVxuICBcbiAgaW5wdXRbdHlwZT1zdWJtaXRdOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Y1MWI1O1xuICB9XG4gIFxuICAuY29udGFpbmVyIHtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjsgKi9cbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOyAqL1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gIH1cbiAgXG4gIC5jb2wtMjUge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAyNSU7XG4gICAgbWFyZ2luLXRvcDogNnB4O1xuICB9XG4gIFxuICAuY29sLTc1IHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogNzUlO1xuICAgIG1hcmdpbi10b3A6IDZweDtcbiAgfVxuICBcbiAgLyogQ2xlYXIgZmxvYXRzIGFmdGVyIHRoZSBjb2x1bW5zICovXG4gIC5yb3c6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgY2xlYXI6IGJvdGg7XG4gIH1cbiAgXG4gIC8qIFJlc3BvbnNpdmUgbGF5b3V0IC0gd2hlbiB0aGUgc2NyZWVuIGlzIGxlc3MgdGhhbiA2MDBweCB3aWRlLCBtYWtlIHRoZSB0d28gY29sdW1ucyBzdGFjayBvbiB0b3Agb2YgZWFjaCBvdGhlciBpbnN0ZWFkIG9mIG5leHQgdG8gZWFjaCBvdGhlciAqL1xuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgIC5jb2wtMjUsIC5jb2wtNzUsIGlucHV0W3R5cGU9c3VibWl0XSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuICB9Il19 */"

/***/ }),

/***/ "./src/app/component/menu-add-device/menu-add-device.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/component/menu-add-device/menu-add-device.component.ts ***!
  \************************************************************************/
/*! exports provided: MenuAddDeviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuAddDeviceComponent", function() { return MenuAddDeviceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let MenuAddDeviceComponent = class MenuAddDeviceComponent {
    constructor() { }
    ngOnInit() {
    }
};
MenuAddDeviceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-menu-add-device',
        template: __webpack_require__(/*! raw-loader!./menu-add-device.component.html */ "./node_modules/raw-loader/index.js!./src/app/component/menu-add-device/menu-add-device.component.html"),
        styles: [__webpack_require__(/*! ./menu-add-device.component.css */ "./src/app/component/menu-add-device/menu-add-device.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], MenuAddDeviceComponent);



/***/ }),

/***/ "./src/app/component/menu-view-admin/menu-view-admin.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/component/menu-view-admin/menu-view-admin.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9tZW51LXZpZXctYWRtaW4vbWVudS12aWV3LWFkbWluLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/component/menu-view-admin/menu-view-admin.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/component/menu-view-admin/menu-view-admin.component.ts ***!
  \************************************************************************/
/*! exports provided: MenuViewAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuViewAdminComponent", function() { return MenuViewAdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let MenuViewAdminComponent = class MenuViewAdminComponent {
    constructor() { }
    ngOnInit() {
    }
};
MenuViewAdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-menu-view-admin',
        template: __webpack_require__(/*! raw-loader!./menu-view-admin.component.html */ "./node_modules/raw-loader/index.js!./src/app/component/menu-view-admin/menu-view-admin.component.html"),
        styles: [__webpack_require__(/*! ./menu-view-admin.component.css */ "./src/app/component/menu-view-admin/menu-view-admin.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], MenuViewAdminComponent);



/***/ })

}]);
//# sourceMappingURL=component-component-module-es2015.js.map