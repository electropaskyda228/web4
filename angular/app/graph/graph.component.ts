import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SimpleChange, ViewChild } from "@angular/core";
import { Coord } from "../classes/coord";
import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs";

@Component({
    selector: "graph",
    templateUrl: "./graph.component.html",
    styleUrl: "./graph.component.scss"
})
export class GraphComponent {
    @ViewChild('graphCanvas', { static: true })
    canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;

    ngAfterViewInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    }

    @Output() 
    sendData = new EventEmitter<boolean>();

    screenSize: number = -1;
    width: number = 400
    height: number = 300
    @Input() koeff: number = 2 
    radius: number = this.min(this.width, this.height) * this.koeff / 5;

    ngOnChanges(changes: SimpleChange) {
        this.radius = this.min(this.width, this.height) * this.koeff / 5;
    }
    
    min(first: number, second: number) : number {
        if (first <= second) {
            return first;
        }
        return second;
    }

    get trianglePoints(): string {
        const coordinates = [
            [this.width / 2, this.height / 2],
            [this.width / 2 + this.radius, this.height / 2],
            [this.width / 2, this.height / 2 - this.radius / 2],
        ];
        return coordinates.map(coord => coord.join(',')).join(' ');
    }

    get arrowTop(): string {
        const coordinates = [
            [this.width / 2, 0],
            [this.width / 2 + 10, 10],
            [this.width / 2 - 10, 10],
        ];
        return coordinates.map(coord => coord.join(',')).join(' ');
    }

    get arrowRight() : string {
        const coordinates = [
            [this.width, this.height / 2],
            [this.width - 10, this.height / 2 - 10],
            [this.width - 10, this.height / 2 + 10],
        ];
        return coordinates.map(coord => coord.join(',')).join(' ');
    }

    get circlePoints() : string {
        return `M ${this.width / 2 - this.radius},${this.height / 2} A ${this.radius},${this.radius} 0 0 0 ${this.width / 2},${this.height / 2 + this.radius}`;
    }

    get triangleCirclePoints() : string {
        const coordinates = [
            [this.width / 2, this.height / 2],
            [this.width / 2 - this.radius, this.height / 2],
            [this.width / 2, this.height / 2 + this.radius],
        ];
        return coordinates.map(coord => coord.join(',')).join(' ');
    }

    clearPoints() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawPoint(coord: Coord) {
        if (coord.result) {
            this.ctx.fillStyle = 'green';
        } else {
            this.ctx.fillStyle = 'blue';
        }
        this.ctx.fillRect(coord.x / this.koeff * this.radius + this.width / 2, -coord.y / this.koeff * this.radius + this.height / 2, 7, 7);
    }

    done: boolean = false;
    answer: Coord = new Coord(0, 0, 0, undefined, "");

    constructor(private httpService: HttpService, private cdr: ChangeDetectorRef, private authService: AuthService, private breakPointObserver: BreakpointObserver){}

    onCanvasClick(event: MouseEvent) {
        const canvas = this.canvasRef.nativeElement;

        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - this.width / 2) / this.radius * this.koeff;
        const y = -(event.clientY - rect.top - this.height / 2) / this.radius * this.koeff;

        this.httpService.postCoord(new Coord(x, y, this.koeff, undefined, this.authService.getUserName())).subscribe({
                                                                            next:(data: Coord) => {
                                                                                this.answer=data;
                                                                                this.sendData.emit(true);
                                                                                this.drawPoint(this.answer);},
                                                                            error: error=>console.log(error),
                                                                            complete: () => {
                                                                                console.log('Запрос завершен');
                                                                              }});
    }

    ngOnInit() {
        this.breakPointObserver.observe([
            Breakpoints.XSmall, // <= 599px
            Breakpoints.Small,   // 600px - 959px
            Breakpoints.Medium, // 960px - 1279px
            Breakpoints.Large,   // 1280px - 1919px
            Breakpoints.XLarge,  // >= 1920px
        ]).pipe(map(result => {
            if (result.breakpoints[Breakpoints.XSmall]) {
              return 3;
            }
            if (result.breakpoints[Breakpoints.Small]) {
              return 3;
            }
            if (result.breakpoints[Breakpoints.Medium]) {
              return 2;
            }
            if (result.breakpoints[Breakpoints.Large]) {
              return 1;
            }
            if (result.breakpoints[Breakpoints.XLarge]) {
              return 1;
            }
            return -1;
          })).subscribe(size => {
            this.screenSize = size;
            if (this.screenSize != -1) {
                this.width = 400 / this.screenSize;
                this.height = 300 / this.screenSize;
                this.radius = this.min(this.width, this.height) * this.koeff / 5; 
            }
          });
    }
}