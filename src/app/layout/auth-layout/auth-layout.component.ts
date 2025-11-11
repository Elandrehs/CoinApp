import { Component , ViewEncapsulation} from '@angular/core';
import {RegisterFormComponent} from '../../features/authentication/components/register-form/register-form.component';
import {LoginFormComponent} from '../../features/authentication/components/login-form/login-form.component';
import {NgClass, NgIf} from '@angular/common';
import {ThemeToggleComponent} from "../../core/components/theme-toggle/theme-toggle.component";
import {LanguageSwitcherComponent} from "../../core/components/language-switcher/language-switcher.component";
import {ClassicButtonComponent} from "../../shared/components/buttons/classic-button/classic-button.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ThemeService} from "../../core/services/theme.service";

@Component({
  selector: 'app-auth-layout',
  imports: [
    RegisterFormComponent,
    LoginFormComponent,
    NgIf,
    NgClass,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
    ClassicButtonComponent,
    TranslatePipe
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent {
  currentView: 'register' | 'login' | null = null;
  setView(view: 'register' | 'login') {
    this.currentView = view;
  }
  logoSrc: string = '';

  constructor(private themeService: ThemeService) {
    const isDark = document.documentElement.classList.contains('dark-mode');
    this.logoSrc = isDark ? '/assets/logo-dark-mode.png' : '/assets/logo-light-mode.png';
  }
}
