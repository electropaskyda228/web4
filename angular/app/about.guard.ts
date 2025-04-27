import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";

export const aboutGuard = () => {
    const authService = inject(AuthService);
    return authService.isLoggedIn;
}