import { Token } from "@angular/compiler";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/authservice/auth.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  mySignup: FormGroup;
  myLogin: any = { email: "", pass1: "" };

  constructor(
    private fBuilder: FormBuilder,
    private uService: UserService,
    private route: Router
  ) {
    this.mySignup = this.fBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      phone: [""],
      pass1: [""],
      avatar: [],
    });
  }

  /***Set File */
  setFile(Event: any) {
    let file = Event.target.files[0];
    console.log(file);
    /***set file into this file */
    this.mySignup.get("avatar")?.setValue(file);
  }

  signup() {
    // if (this.mySignup.value.valid) {
    console.log(this.mySignup.value);

    /*** create a object of FormData **/
    let userData = new FormData();
    let signupFrom = this.mySignup.value;
    /***Old method */
    // form.append('fistName', this.mySignup.get('firstName')?.value);
    Object.keys(signupFrom).forEach((em: any) => {
      console.log(em, signupFrom[em]);
      userData.append(em, signupFrom[em]);
    });

    /***Now calling api */
    this.uService.userSignup(userData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // } else {
    //   alert("Form Not valid");
    // }
  }

  /***Login User*/
  login() {
    console.log(this.myLogin);
    /***Login api call*/
    this.uService.userLogin(this.myLogin).subscribe({
      next: (res: any) => {
        console.log(res);
        /***User info into the local storage */
        let info = {
          token: res.token.key,
          token_type: res.token.type,
          user_id: res.userInfo._id,
          email: res.userInfo.email,
          role: res.userInfo.role,
        };
        // console.log(info);
        localStorage.setItem("role", res.userInfo.role);
        localStorage.setItem("userInfo", JSON.stringify(info));
        alert(res.message);
        if (res.userInfo.role == "admin") {
          /*** Redirect    to admin route */
          this.route.navigateByUrl("/admin");
        } else if (res.userInfo.role == "regular") {
          /** Redirect  to product page */
          this.route.navigateByUrl("/products");
        } else {
          this.route.navigateByUrl("/login");
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
