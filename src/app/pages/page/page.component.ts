import { OptionsButtonComponent } from './../../components/options-button/options-button.component';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserDetail } from '../../interfaces/user-detail';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    OptionsButtonComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  user: UserDetail = {
    id: 'A',
    fullName: 'Miguel Sombrio'
  }

}
