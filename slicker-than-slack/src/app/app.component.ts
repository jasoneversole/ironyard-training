import { Component } from '@angular/core';
import { LogService } from './log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slicker than Slack';
  names = ['abel', 'barack', 'cauliflower', 'dude'];
  childInfo = { name: 'Utki', age: 17, hasPet: false };

  constructor(private log: LogService) {}

  writeName(name: string): void {
    this.log.info(name);
  }
}
