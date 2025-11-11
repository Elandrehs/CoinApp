import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    SidebarComponent,
    TranslatePipe
  ],
  standalone: true
})
export class NavbarComponent {
  isProfileRoute = false;

  constructor(private router: Router,private authService: AuthService,) {

  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  navigateToFriends(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('❌ No se pudo obtener el ID del usuario logueado');
      return;
    }

    const cleanedId = userId.replace(/^"|"$/g, '');
    this.router.navigate(['/main/friends', cleanedId]);
  }

}
