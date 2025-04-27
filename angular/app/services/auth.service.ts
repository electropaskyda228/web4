import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    isLoggedIn = false;
    username: string = "";
    password: string = "";
    login(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.isLoggedIn = true;
    }

    logout() {
        this.username = "";
        this.password = "";
        this.isLoggedIn = false;
    }

    getUserName() : string {
        return this.username;
    }
}