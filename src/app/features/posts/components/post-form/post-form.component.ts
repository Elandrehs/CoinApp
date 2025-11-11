import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { IconButtonComponent } from '../../../../shared/components/buttons/icon-button/icon-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  standalone: true,
  imports: [
    ClassicButtonComponent,
    ReactiveFormsModule,
    AvatarComponent,
    IconButtonComponent,
    TranslateModule
  ]
})
export class PostFormComponent {
  content = new FormControl('');
  @Output() postSubmitted = new EventEmitter<string>();

  placeholderOptions = [
    'post.placeholder.thinking',
    'post.placeholder.feeling',
    'post.placeholder.happening',
    'post.placeholder.express'
  ];

  selectedPlaceholder = this.placeholderOptions[
    Math.floor(Math.random() * this.placeholderOptions.length)
    ];

  onSubmit(): void {
    const text = this.content.value?.trim();
    if (!text) return;
    this.postSubmitted.emit(text);
    this.content.reset();
  }
}
