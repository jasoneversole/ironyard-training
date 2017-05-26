import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  info(msg, ...args) {
    console.log(msg, ...args);
  }

}
