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
    const link = `${environment.usaJobsUrl}/${arg.url}`;
    const data = { params: arg.params }
    const options = { params: arg.params, headers: headerDict };
    return this.http.get(link, options)
  }

  httpPost(url: any, body: any): Observable<any> {
    let headers = { 'content-type': 'application/json' }
    const completeUrl = `${environment.baseUrl}${url}`;
    return this.http.post(completeUrl, body, { 'headers': headers })
  }
  httpPostForUplaod(url: any, body: any): Observable<any> {
    let headers = {}
    const completeUrl = `${environment.baseUrl}${url}`;
    return this.http.post(completeUrl, body, { 'headers': headers })
  }
}
