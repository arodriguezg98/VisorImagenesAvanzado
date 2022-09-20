import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {

  constructor() {}

  getFiles(): Observable<string[]> {
    const arr: string[] = [];

    for(let i = 0; i < 100; i++) {
      arr.push(`https://picsum.photos/id/${i}/4096/2048`)
    }

    return of(arr);
  }
}
