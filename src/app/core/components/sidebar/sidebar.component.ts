import { Component } from '@angular/core';
import {ThemeToggleComponent} from '../theme-toggle/theme-toggle.component';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    ThemeToggleComponent,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  handleGoToProfile(event: MouseEvent): void {
    const actualUserLogged=this.authService.getUserId();
    if(!actualUserLogged){
      console.error('❌ No se puede navegar: this.authService.getUserId() es undefined', this.authService.getUserId());
      return;
    }
    event.stopPropagation();
    this.router.navigate(['/main/profile', actualUserLogged.replace(/^"|"$/g, '')]);
  }
  handleLogOut(event: MouseEvent): void {
    event.stopPropagation();
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
