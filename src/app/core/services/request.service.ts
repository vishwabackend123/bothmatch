import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


  put(path: string, body: Object = {}) {
    return this.http.put(
      `${environment.backendBaseUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    debugger
    const headers = { 'content-type': 'application/json'}
    return this.http.post(
      `${environment.backendBaseUrl}${path}`, body,{'headers':headers}
    ).pipe(catchError(this.formatErrors));
  }

}
