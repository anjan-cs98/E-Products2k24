import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  CSP_NONCE,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PRODUCT } from "src/app/models/product/product.model";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  productList: PRODUCT[] = [];
  productForm: FormGroup;
  updateProObj: any = [];
  titleMsg: boolean = true;
  showHideModel: boolean = true;

  @ViewChild("takeInput", { static: false })
  InputVar!: ElementRef;
  constructor(
    private pService: ProductService,
    private fBuilder: FormBuilder,
    private route: Router
  ) {
    /***pro_name, pro_desc, pro_price,pro_image */
    this.productForm = this.fBuilder.group({
      pro_name: [""],
      pro_desc: [""],
      pro_price: [""],
      pro_image: [""],
    });
  }

  reset() {
    // We will clear the value of the input
    // field using the reference variable.
    this.InputVar.nativeElement.value = "";
  }
  /***Set File */
  setFile(Event: any) {
    let file = Event.target.files[0];
    console.log(file);
    /***set file into this file */
    this.productForm.get("pro_image")?.setValue(file);
  }

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

  modalOpen() {
    this.titleMsg = true;
    this.showHideModel = true;
  }
  modalClose() {
    this.showHideModel = false;
  }

  /**** Add New Product  */
  addNewProduct() {
    console.log("addd" + this.titleMsg);
    console.log(this.productForm.value);

    /*** create a object of FormData **/
    let productData = new FormData();
    let ProductFrom = this.productForm.value;
    /***Old method */
    // form.append('fistName', this.mySignup.get('firstName')?.value);
    Object.keys(ProductFrom).forEach((pro: any) => {
      // console.log(pro, this.productForm[pro]);
      productData.append(pro, ProductFrom[pro]);
    });

    /*** add new product api call */
    this.pService.addProduct(productData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
        /***Get all product */
        /**close modal*/
        this.showHideModel = false;
        this.modalClose();

        this.getAll();
      },
      error: (error) => {
        console.log(error);
      },
    });

    /**form reset **/
    this.productForm.reset();
    this.reset();
    /**close modal*/
    this.showHideModel = false;
  }

  /***Open Modal and set */
  openUpdateModal(p: any) {
    console.log(p);
    /** assign into the updateProObj */
    this.updateProObj = p;
    this.titleMsg = false;
    this.showHideModel = true;
    //console.log("update" + this.titleMsg);
    /*** Now seeting up the value of a  */
    this.setUpdateProduct();
  }
  /***Now set value to productfrom */
  setUpdateProduct() {
    this.productForm.get("pro_name")?.setValue(this.updateProObj.pro_name);
    this.productForm.get("pro_desc")?.setValue(this.updateProObj.pro_desc);
    this.productForm.get("pro_price")?.setValue(this.updateProObj.pro_price);
  }

  /*** Call Update product depends on ID */
  updateProductByID() {
    /*** create a object of FormData **/
    let productData = new FormData();
    let ProductFrom = this.productForm.value;
    /***Old method */
    // form.append('fistName', this.mySignup.get('firstName')?.value);
    Object.keys(ProductFrom).forEach((pro: any) => {
      // console.log(pro, this.productForm[pro]);
      productData.append(pro, ProductFrom[pro]);
    });
    /***update api call */
    this.pService.updateProduct(this.updateProObj._id, productData).subscribe({
      next: (res: any) => {
        console.log(res);

        this.showHideModel = false;
        this.modalClose();
        /***Get all api call */
        this.getAll();
        alert(res.message);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    /**form reset **/
    this.productForm.reset();
    this.reset();
    /**close modal*/
    this.showHideModel = false;
  }

  /*** Delete Product  */
  deleteByID(_id: any) {
    var conf = confirm("Would you like to delete this product");
    console.log(conf);
    if (conf) {
      /**Delete api call */
      this.pService.deleteProduct(_id).subscribe({
        next: (res: any) => {
          console.log(res);
          /***get all  */
          this.getAll();
          alert(res.message);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  /** logout */
  logout() {
    localStorage.clear();
    alert("You  have successfully logout");
    this.route.navigateByUrl("/login");
  }
}
