import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  httpGet(arg: { url: string, params?: HttpParams }): Observable<any> {
    const headerDict = new HttpHeaders({
      // 'User-Agent': 'grow@curateventures.com',
      'Authorization-Key': 'vsvO9VtJEAuoIGx4qQLzTXmY0z9bsHFccK6yk+4zL2M='
    });
    const link = `${environment.baseUrl}/${arg.url}`;
    const data = { params: arg.params }
    const options = { params: arg.params, headers: headerDict };
    return this.http.get(link, options)
  }
  
  httpPost(url :any, body : any ): Observable<any> {
    console.log("This is URL::", url, "And This is the whole file data::", body)
    const headers = { 
    'content-type': 'application/json',
    // 'Authorization-Key': 'vsvO9VtJEAuoIGx4qQLzTXmY0z9bsHFccK6yk+4zL2M=',
    // 'mode': 'no-cors'
    }
     debugger;
     const completeUrl = `${environment.backendBaseUrl}/${url}`;
    // const completeUrl = `${url}`;
    return this.http.post( completeUrl, body,{'headers':headers})
  }
  
  httpPostForUplaod(url: any, body: any): Observable<any> {
    let headers = {}
    const completeUrl = `${environment.backendBaseUrl}${url}`;
    return this.http.post(completeUrl, body, { 'headers': headers })
  }
}
