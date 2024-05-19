import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  set<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // print() {
  //   const result = [];
  //   for (var i = 0; i < localStorage.length; i++) {
  //     result.push(this.get(localStorage.key(i)));
  //   }

  //   console.log('result', result);
  //   return result;
  // }
}
