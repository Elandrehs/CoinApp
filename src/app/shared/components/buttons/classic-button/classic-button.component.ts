import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-classic-button',
  templateUrl: './classic-button.component.html',
  styleUrls: ['./classic-button.component.css'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class ClassicButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
