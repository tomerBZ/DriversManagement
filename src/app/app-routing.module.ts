import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DriverComponent } from './driver/driver.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Add',
    component: AddComponent
  },
  {
    path: 'Driver/:email',
    component: DriverComponent
  },
  {
    path: 'Edit/:email',
    component: EditComponent
  },
  {
    path: 'Drivers',
    component: ListComponent
  },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
