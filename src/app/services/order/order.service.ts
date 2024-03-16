import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private pro_api_url: string = "https://e-products.glitch.me/products";
  constructor(private http: HttpClient) {}

  /***Placed Order */
  ///buy/:pro_id/:user_id
  orderPlaced(orderInfo: any) {
    return this.http.post(`${this.pro_api_url}/order/buy`, orderInfo);
  }

  /***View Order info by order id  */
  viewOrderInfo(order_id: any) {
    return this.http.get(`${this.pro_api_url}/order/view/${order_id}`);
  }
}
