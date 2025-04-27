import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {map} from "rxjs/operators"
import { Coord } from "../classes/coord";
import { User } from "../classes/user";

@Injectable()
export class HttpService {

    private apiUrl: string = "http://localhost:8080/";
    
    constructor(private http: HttpClient){}

    getCoords(userName: string) : Observable<Coord[]> {
        return this.http.get(this.apiUrl + "get-all-points/" + userName).pipe(map((data:any)=>{
            let coordList = data;
            return coordList.map(function(coord: any): Coord {
                return new Coord(coord.x, coord.y, coord.r, coord.result, coord.username);
            }); 
        }));
    }

    postCoord(coord: Coord) : Observable<Coord> {
        const body = {x: coord.x, y: coord.y, r: coord.r, username: coord.userName};
        return this.http.post(this.apiUrl + "create-point", body).pipe(map((data:any)=>{
            return new Coord(data.x, data.y, data.r, data.result, data.username);
        }));
    }

    postUser(user: User) : Observable<User|null> {
        const body = {username: user.userName, password: user.password};
        return this.http.post(this.apiUrl + "login", body).pipe(map((data:any)=>{
            if (data === undefined || data == null) {
                return null;
            }
            return new User(data.username, data.password);
        }))
    }
}