import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

import { FormsModule } from "@angular/forms";
import { LogoutComponent } from "../logout/logout.component";

@NgModule({
  declarations: [ProductComponent, LogoutComponent],
  imports: [CommonModule, ProductRoutingModule, FormsModule],
  exports: [],
})
export class ProductModule {}
