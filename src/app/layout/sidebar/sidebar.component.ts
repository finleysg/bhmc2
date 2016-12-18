import {Component, OnInit, HostBinding} from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "./layout.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user";

@Component({
  moduleId: module.id,
  selector: 'bhmc-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  user: User = null;
  //@HostBinding('class.toggled') isOpen: boolean;
  isOpen: boolean;

  constructor(
    private _router: Router,
    private _layoutService: LayoutService,
    private _userService: UserService
  ) {
    this._layoutService.sidebarToggle.subscribe(value => this.isOpen = value)
  }

  ngOnInit(): void {
    this.user = this._userService.getCurrentUser();
  }

  logout(): void {
    this._router.navigate(['home']);
  }
}
