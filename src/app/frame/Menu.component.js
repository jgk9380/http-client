/**
 * Created by jianggk on 2017/1/11.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MenuComponent = (function () {
    // menuShow: boolean;
    function MenuComponent(router) {
        this.router = router;
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.items = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'Open', icon: 'fa-download' }
                ]
            },
            {
                label: 'Edit',
                items: [
                    { label: 'Undo', icon: 'fa-refresh' },
                    { label: 'Redo', icon: 'fa-repeat' },
                    { label: 'New', icon: 'fa-plus' },
                ]
            },
            {
                label: 'save',
                items: [
                    { label: 'save1', icon: 'fa-refresh' },
                    { label: 'save2', icon: 'fa-repeat' }
                ]
            },
        ];
    };
    MenuComponent.prototype.click = function (mi) {
        mi.show = !mi.show;
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: 'module.id',
            selector: 'hc-menu-pad',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        })
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
