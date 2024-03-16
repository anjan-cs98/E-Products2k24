import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private pro_api_url: string = "https://e-products.glitch.me/products";

  /**All Product Related API end points**/

  /**get all Product list**/
  getAllProduct() {
    return this.http.get(`${this.pro_api_url}/list`);
  }

  /*** Get Particular  product by ID   */
  getProductByID(_id: any) {
    return this.http.get(`${this.pro_api_url}/list/${_id}`);
  }

  /***Get Product by Price limit */
  getProductByPrice(lim1: any, lim2: any) {
    return this.http.get(`${this.pro_api_url}/limit/${lim1}/${lim2}`);
  }

  /***Add new Product */
  addProduct(proData: any) {
    return this.http.post(`${this.pro_api_url}/add`, proData);
  }

  /***Update Product depnends on ID */
  updateProduct(_id: any, proData: any) {
    return this.http.put(`${this.pro_api_url}/edit/${_id}`, proData);
  }

  /***Delete particual item  */
  deleteProduct(_id: any) {
    return this.http.delete(`${this.pro_api_url}/del/${_id}`);
  }

  // /***Placed Order */
  // ///buy/:pro_id/:user_id
  // orderPlaced(orderInfo: any) {
  //   return this.http.post(`${this.pro_api_url}/order/buy`, orderInfo);
  // }
}
