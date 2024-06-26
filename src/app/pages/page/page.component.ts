import { Component } from '@angular/core';
import { DateExampleComponent } from '../../date-example/date-example.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    DateExampleComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
