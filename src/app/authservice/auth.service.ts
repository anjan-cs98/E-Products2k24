import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {
    // this.isAdmin();
  }

  // /**User admin or not*/
  // isAdmin() {
  //   let user = JSON.parse(localStorage.getItem("userInfo") || "");
  //   console.log(user);
  //   if (user.role == "admin") {
  //     return true;
  //   }
  //   return false;
  // }
}
