import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class IconButtonComponent {
  @Input() type: 'heart' | 'comment'|'goback' |'send'| 'image' = 'comment';
  @Input() id: string = 'icon-' + Math.random().toString(36).substring(2, 8);
  @Input() liked: boolean = false;

}
