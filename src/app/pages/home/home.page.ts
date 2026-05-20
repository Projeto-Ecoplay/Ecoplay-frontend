import { Component } from '@angular/core';
import { HomeComponentsModule } from '../../components/home/home-components.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponentsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {}
