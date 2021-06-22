import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenStorageService, private router: Router) { }

  public canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      return true;
    }
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
