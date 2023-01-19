import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading: boolean = false;

  constructor() { }

  get loading(): boolean {
    return this._loading;
  }

  onRequestStarted(): void {
    this._loading = true;
  }

  onRequestFinished(): void {
    this._loading = false;
  }
}
