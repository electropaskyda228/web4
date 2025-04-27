import { Component, NgModule, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';

import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from '../graph/graph.component';
import { Coord } from '../classes/coord';
import { BoldDirective } from '../bold.directive';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BoldDirective, ReactiveFormsModule, HttpClientModule, GraphComponent, TableModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [HttpService]
})
export class MainComponent {
  title = 'web4';
  coordsForm : FormGroup;
  newCoord: Coord = new Coord(0, 0, 0, undefined, "");
  done: boolean = false;

  coords: Coord[] = [];
  radius: number = 2;

  @ViewChild(GraphComponent, {static: false})
  private graphComponent: GraphComponent|undefined;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) {
    this.coordsForm = new FormGroup({
      "xField" : new FormControl("", [Validators.required, this.xValidator]),
      "yField" : new FormControl("", [Validators.required, this.yValidator]),
      "radius" : new FormControl("", [Validators.required, this.radiusValidator])
    });
  }

  xValidator(control: FormControl): {[s:string]:boolean}|null {
    if (isNaN(control.value)) {
      return {"xField": true};
    }
    if (control.value <= -3 || control.value >= 3) {
      return {"xField": true};
    }
    return null;
  }

  yValidator(control: FormControl): {[s:string]:boolean}|null {
    if (isNaN(control.value)) {
      return {"yField": true};
    }
    if (control.value <= -5 || control.value >= 3) {
      return {"yField": true};
    }
    return null;
  }

  radiusValidator(control: FormControl) : {[s:string]:boolean}|null {
    if (isNaN(control.value)) {
      return {"radius": true};
    }
    if (control.value < 0 || control.value >= 3) {
      return {"radius": true};
    }
    return null;
  }

  submit() {
    const coords: Coord = new Coord(this.coordsForm.get("xField")?.value, 
                                    this.coordsForm.get("yField")?.value, 
                                    this.coordsForm.get("radius")?.value,
                                    undefined,
                                  this.authService.getUserName());
    this.httpService.postCoord(coords).subscribe({
      next:(data: any) => {this.getAllCoords();this.graphComponent?.drawPoint(coords)},
      error: error=>console.log(error)
    });
  }

  ngOnInit(){
    this.getAllCoords();
  }

  getAllCoords() {
    this.httpService.getCoords(this.authService.getUserName()).subscribe({next:(data: Coord[]) => this.coords=data});
  }

  updateDataCanvas(done: boolean) {
    this.getAllCoords();
  }

  updateRadius() {
    this.radius = this.coordsForm.get("radius")?.value;
    this.graphComponent?.clearPoints();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"])
  }
}
