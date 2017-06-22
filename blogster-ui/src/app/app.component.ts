import { Component } from '@angular/core';
import { Person } from './people.model';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  objArray:Person[];
  selectedObject:Person;
  constructor(private peopleService: PeopleService) {
    peopleService.GetAll().subscribe(data => this.objArray = data);
    this.selectedObject = this.objArray[1];
  }
  updateSelectedValue(event:string): void{
    this.selectedObject = JSON.parse(event);
  }
}
