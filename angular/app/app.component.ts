import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BoldDirective } from "./bold.directive";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpBackend, HttpClientModule } from "@angular/common/http";
import { GraphComponent } from "./graph/graph.component";
import { User } from "./classes/user";
import { HttpService } from "./services/http.service";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BoldDirective, ReactiveFormsModule, HttpClientModule, GraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpService]
})
export class AppComponent {

}
