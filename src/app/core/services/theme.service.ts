import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'dark-mode-enabled';

  constructor() {
    const storedTheme = localStorage.getItem(this.key);
    if (storedTheme === 'true') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggleTheme(): void {
    const isDark = document.documentElement.classList.contains('dark-mode');
    if (isDark) {
      this.enableLight();
    } else {
      this.enableDark();
    }
  }

  private enableDark(): void {
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem(this.key, 'true');
  }

  private enableLight(): void {
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.add('light-mode');
    localStorage.setItem(this.key, 'false');
  }
}
