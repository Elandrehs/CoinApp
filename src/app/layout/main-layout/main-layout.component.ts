import {Component, ViewEncapsulation} from '@angular/core';
import {NavbarComponent} from '../../core/components/navbar/navbar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';
import {MessagingPanelComponent} from '../../features/messaging/components/messaging-panel/messaging-panel.component';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgIf,
    MessagingPanelComponent,
    TranslatePipe
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  isMainPage: boolean = false;
  username:string='';
  constructor( private router: Router,/*private authService:AuthService*/) {}

  ngOnInit(){
    /*
   this.userLogged=this.authService.getUserId();
    */
    this.isMainPage = this.router.url === '/main';

    // Suscribirse a los eventos de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isMainPage = event.urlAfterRedirects === '/main';
      });
  }
}
