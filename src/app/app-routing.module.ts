import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';


const routes: Routes = [
  {path:"header",component:HeaderComponent},
  {path:"display",component:DisplayProductComponent},
  {path:"spinner",component:SpinnerComponent},
  {path:"add-product",component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
