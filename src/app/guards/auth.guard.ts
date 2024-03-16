import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../authservice/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  /*** if We  service we need to use DI  */
  //let adminService = inject(AuthService);
  let ro = inject(Router);
  //var data = JSON.parse(localStorage.getItem("storeData"));
  //let user = JSON.parse(localStorage.getItem("userInfo") || "");
  //console.log(user);
  //console.log(adminService.isAdmin());
  let role = localStorage.getItem("role");
  console.log(role);
  if (role == "admin") {
    /** redirect  to admin */
    //ro.navigateByUrl("/admin");
    return true;
  } else if (role == "regular") {
    alert("You have no Permision");
    ro.navigateByUrl("/login");
  }
  alert("You have no Permision");
  ro.navigateByUrl("/login");
  return false;
};
