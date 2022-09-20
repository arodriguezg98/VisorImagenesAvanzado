import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ITermografiaJsonData } from "./models";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public readonly token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIyYzBkYzNmYy0zNmE3LTQxYTYtYjAzMi1iODMzZGVkODVlNDQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYjU3ZmE5MTgtNWRiOC00YmZkLTliNzItZDQ3ODNhMzkyNzA5L3YyLjAiLCJpYXQiOjE2NjM2NjM4MzcsIm5iZiI6MTY2MzY2MzgzNywiZXhwIjoxNjYzNjY5MTI0LCJhaW8iOiJBVFFBeS84VEFBQUFNQmtNZ3pBZTVLRVhqVVpEc3d2SVBUdnN3M0plQmFmbkh4cmQ2b2dDajdwQm9NaUM0TWNXNGFQdWR0RXVrZkJpIiwiYXpwIjoiMmMwZGMzZmMtMzZhNy00MWE2LWIwMzItYjgzM2RlZDg1ZTQ0IiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJBbHZhcm8gUm9kcmlndWV6IEdhcmNpYSIsIm9pZCI6IjZhNDNlZjJhLWY1MzgtNGMyNS04YWJkLWQ3NmE3YzkzNDk0ZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImFyb2RyaWd1ZXpnQGNvc2VudGluby5jb20iLCJyaCI6IjAuQVFVQUdLbF90YmhkX1V1YmN0UjRPamtuQ2Z6RERTeW5OcVpCc0RLNE05N1lYa1FGQU84LiIsInJvbGVzIjpbImFkbWluIiwic2NhZGEiXSwic2NwIjoiYXBpLmRpZ2l0YWxpemFjaW9uIiwic3ViIjoiV3dJWUdOTV9OOExZV3JJUnoyWDhNZnpDa2NMVzB2STBUUFdTLVFONjNPOCIsInRpZCI6ImI1N2ZhOTE4LTVkYjgtNGJmZC05YjcyLWQ0NzgzYTM5MjcwOSIsInV0aSI6InhfaEw4VVlpMTBlLXhGSjI1REJMQUEiLCJ2ZXIiOiIyLjAifQ.aG9AF1P1kfWktEWP6JPFKssPvliP_BKZ9SfPymU6h7GlE7jU_5aODTEQzUD9Mpx-6D1SJyUdTYDJoKjVgZw13YTIxeT2id_z_OSLuVPm_21RrZePNc1YhgOcmGMBL3BA7Svym4Hdwaj5nELNRDGQmNiXTHmWmo4A9exbVpUoKXkw7mp1e_kLa1yPwdRRIn6BQBAuExj7Km1QKbbxgzP-kQFxAs3_aAmLMBsE1w2k6b7vtRjnBJGR-wf-yy9yZRABq5WEuvgoNj9zgOF5WRzBdf9uOm-0BSIUQWCU92pDRlAKleY4EGxy9MCc2aYCjGqOw2yTiWq6k3pbC9IkxQ_3zw";

  constructor(private readonly httpClient: HttpClient) {}

  getFiles(): Observable<string[]> {
    const arr: string[] = [];

    for(let i = 0; i < 100; i++) {
      arr.push(`https://picsum.photos/id/${i}/4096/2048`)
    }

    return of(arr);
  }

  // getFilesNoParam(localizacion: string) {
  //   const fecha = new Date(
  //     new Date().getTime() - new Date().getTimezoneOffset() * 60000
  //   )
  //     .toISOString()
  //     .split("T")[0];
  //   return this.getFiles(localizacion, fecha);
  // }

  // getFiles(
  //   localizacion: string,
  //   fecha: string,
  //   tipo: string = ".json"
  // ): Observable<string[]> {
  //   const ffff = fecha.replace(/-/g, "/");

  //   let myHeaders = new HttpHeaders();
  //   myHeaders.set("Authorization", `Bearer ${this.token}`);
  //   let options =  { headers: myHeaders };

  //   return this.httpClient
  //     .get<string[]>(
  //       `${environment.apiDigitalizacion}/api/v1/blob-storage/json-files?path=ImagenesJson/${localizacion}/${ffff}&filter=${tipo}`,
  //       options
  //     )
  //     .pipe(
  //       // ordena la lista solo usando el timestamp
  //       map((s) => {
  //         /**
  //          * "Termografia/Almería_Silestone2_Planta7_Horno/2021/10/04/20211004000358_14.ct.jpg",
  //          * "Termografia/Almería_Silestone2_Planta7_Horno/2021/10/04/20211004000358_14.temperaturas.json",
  //          * "Termografia/Almería_Silestone2_Planta7_Horno/2021/10/04/20211004000358_77_107_14.gray.bmp",
  //          * "Termografia/Almería_Silestone2_Planta7_Horno/2021/10/04/20211004000358_77_107_14.ironbow.bmp"
  //          */
  //         const sorted = s.sort((a, b) => {
  //           const aa = a.split("/").slice(-1)[0];
  //           const bb = b.split("/").slice(-1)[0];
  //           /**
  //            * "20211004000358_14.ct.jpg",
  //            * "20211004000358_14.temperaturas.json",
  //            * "20211004000358_77_107_14.gray.bmp",
  //            * "20211004000358_77_107_14.ironbow.bmp"
  //            */

  //           const splA = aa.split("_")[0];
  //           const splB = bb.split("_")[0];

  //           return b.localeCompare(a);
  //         });

  //         return sorted;
  //       })
  //     );
  // }

  getJsonFile(fullFilePath: string): Observable<ITermografiaJsonData> {
    return this.httpClient
      .get<ITermografiaJsonData>(
        `${environment.apiDigitalizacion}/api/blob-storage/archivo?path=${fullFilePath}`
      )
      .pipe(
        map((m) => ({
          ...m,
          heigth: m.height ? m.height : m.heigth,
        }))
      );
  }
}
