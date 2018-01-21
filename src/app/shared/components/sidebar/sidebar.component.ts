import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // @Output() navbarChanged = new EventEmitter<any>();
  /*toggleSideBar(sidebar) {
    this.navbarChanged.emit(sidebar);
  }*/
  sideNavView: boolean;
  constructor() {
    this.sideStatus();
  }

  ngOnInit() {
  }

  checkIfMobile(sidenav) {
    if (window.screen.width <= 876) {
      this.toggleSideBar(sidenav);
    }
  }

  toggleSideBar(sidebar) {
    sidebar.toggle();
  }

  sideStatus() {
    this.sideNavView = true;
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 991) {
      this.sideNavView = false;
    }
  }
}
