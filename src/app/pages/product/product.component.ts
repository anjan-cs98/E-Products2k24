import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PRODUCT } from "src/app/models/product/product.model";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productList: PRODUCT[] = [];
  /***Price limit */
  start: number = 1000;
  end: number = 2000;
  constructor(private pService: ProductService, private route: Router) {}

  /***life cycle hooks */
  ngOnInit(): void {
    /**get all  */
    this.getAll();
  }

  /***Get all product*/
  getAll() {
    this.pService.getAllProduct().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  priceLimit() {
    /*** limit search condition */
    if (this.end >= this.start) {
      this.getProductByPricelimit();
    } else {
      alert("Please select valid price range");
    }
    console.log("limit fn");
  }

  /***Get Product by price limit */
  getProductByPricelimit() {
    this.pService.getProductByPrice(this.start, this.end).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  /*** Order product  */
  order(p: any) {
    console.log(p);
    let product_id = p._id;
    /***redirect to order com */
    this.route.navigate(["/order", product_id]);
    //this.route.navigateByUrl('/order');
  }
}
