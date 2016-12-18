import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from '../../services/user';
import {LayoutService} from '../../services/layout.service';
import {UserService} from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'bhmc-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  user: User = null;
  isOpen: boolean;
  adminUrl: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _layoutService: LayoutService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.getCurrentUser();
    this.adminUrl = 'http://localhost:8000/admin';
    this._layoutService.sidebarToggle.subscribe(value => this.isOpen = value);
  }

  close(): void {
    this._layoutService.closeSidebar();
  }

  isCurrentRoute(parent: string): boolean {
    if (this._route && this._route.parent) {
      return this._route.parent.toString() === parent;
    }
    return false;
  }

  logout(): void {
    this._router.navigate(['home']);
  }
}
