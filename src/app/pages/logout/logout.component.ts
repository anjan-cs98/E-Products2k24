import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  ActiveUser: any = "";
  isButton: boolean = false;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**get user info */
  getUserInfo() {
    let user = JSON.parse(localStorage.getItem("userInfo") || "[]");
    console.log(user);
    this.ActiveUser = user.email;
    console.log(this.ActiveUser);
    if (this.ActiveUser) {
      this.isButton = true;
    }
  }

  /*** logout fun */
  logout() {
    localStorage.clear();
    alert("You have succesfully logout");
    this.route.navigateByUrl("/login");
  }
}
