import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-displayer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-displayer.component.html',
  styleUrl: './user-displayer.component.css'
})
export class UserDisplayerComponent {
}
