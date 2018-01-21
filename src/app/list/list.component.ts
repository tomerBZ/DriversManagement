import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDriverDialogComponent } from '../shared/components/add-driver-dialog/add-driver-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDriverDialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
