import { AfterViewInit, Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
  standalone: true
})
export class ThemeToggleComponent implements AfterViewInit {
  constructor(private themeService: ThemeService) {}

  ngAfterViewInit(): void {
    const isDark = document.body.classList.contains('dark-mode');
    const checkbox = document.getElementById('theme-mode') as HTMLInputElement;
    if (checkbox) checkbox.checked = isDark;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
