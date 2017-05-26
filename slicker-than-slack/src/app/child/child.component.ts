import { Component, OnInit, Input } from '@angular/core';

interface ChildInfo {
  name: string;
  age: number;
  hasPet: boolean;
}

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input()
  info: ChildInfo;

  constructor() {
    this.info = { name: 'Chuck', age: 102, hasPet: true };
  }

  ngOnInit() {
  }

}
