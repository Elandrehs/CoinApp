import { Component , EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {AvatarComponent} from '../../../../shared/components/avatar/avatar.component';
import {IconButtonComponent} from '../../../../shared/components/buttons/icon-button/icon-button.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, ClassicButtonComponent, AvatarComponent, IconButtonComponent, TranslatePipe]
})
export class CommentFormComponent {
  @Output() commentSubmitted = new EventEmitter<string>();

  contentControl = new FormControl('');
  submitComment(): void {
    const content = this.contentControl.value?.trim();
    if (content) {
      this.commentSubmitted.emit(content);
      this.contentControl.reset();
    }
  }

}
