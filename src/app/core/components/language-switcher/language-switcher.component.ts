import {Component, ViewEncapsulation} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LanguageSwitcherComponent {


  protected currentLang: string="en";


  protected languages:string[]=['en','es'];


  constructor(private translate: TranslateService) {
    const storedLang = localStorage.getItem('preferredLanguage');

    // Si hay idioma guardado, usarlo; si no, usar inglés por defecto
    const defaultLang = storedLang || 'en';
    this.currentLang = defaultLang;

    translate.setDefaultLang('en');
    translate.use(defaultLang);
  }


  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    localStorage.setItem('preferredLanguage', language);
  }
}
