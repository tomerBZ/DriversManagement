import { Component, OnInit } from '@angular/core';
import { RouterService } from '../shared/services/router/router.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private _router: RouterService) {
  }

  ngOnInit() {
  }
  done() {
    this._router.navigateTo('/', '');
  }
}
