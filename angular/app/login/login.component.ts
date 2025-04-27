import { Component } from "@angular/core";
import { Route, Router, RouterOutlet } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpBackend, HttpClientModule } from "@angular/common/http";
import { User } from "../classes/user";
import { GraphComponent } from "../graph/graph.component";
import { BoldDirective } from "../bold.directive";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BoldDirective, ReactiveFormsModule, HttpClientModule, GraphComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [HttpService]
})
export class LoginComponent {

  userForm: FormGroup;

  constructor(private httpService: HttpService, private router: Router, private authService: AuthService){
    this.userForm = new FormGroup({
      "userName": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required])
    });
  }

  submit() {
    const user: User = new User(this.userForm.get("userName")?.value, this.userForm.get("password")?.value);
    this.httpService.postUser(user).subscribe({
      next:(data:any)=>{
        if (data !== null) {
            this.authService.login(data.userName, data.password);
            this.router.navigate(["/main"])
        } else {
            alert("Wrong password");
        }},
      error: error => console.log(error)
    });
  }

}
