"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var home_module_1 = require('./home/home.module');
var policies_module_1 = require('./features/policies/policies.module');
var results_module_1 = require('./features/results/results.module');
var events_module_1 = require('./features/events/events.module');
var directory_module_1 = require('./features/directory/directory.module');
var contact_module_1 = require('./features/contact/contact.module');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var layout_module_1 = require('./layout/layout.module');
var app_routing_module_1 = require('./app-routing.module');
var core_module_1 = require('./core/core.module');
var shared_module_1 = require('./shared/shared.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                core_module_1.BhmcCoreModule,
                shared_module_1.SharedModule,
                layout_module_1.LayoutModule,
                home_module_1.HomeModule,
                contact_module_1.ContactModule,
                directory_module_1.DirectoryModule,
                events_module_1.EventsModule,
                results_module_1.ResultsModule,
                policies_module_1.PoliciesModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map