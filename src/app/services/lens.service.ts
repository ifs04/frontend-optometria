import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LensI } from '../models/lens';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LensService {
  private baseUrl = 'http://localhost:3000/lenses/public';
  private lensSubject = new BehaviorSubject<LensI[]>([]);
  lenses$ = this.lensSubject.asObservable();


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


getAllLenses(): Observable<LensI[]> {
    return this.http.get<LensI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getLensById(id: number): Observable<LensI> {
    return this.http.get<LensI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createLens(lens: LensI): Observable<LensI> {
    return this.http.post<LensI>(this.baseUrl, lens, { headers: this.getHeaders() });
  }

  updateLens(id: number, lens: LensI): Observable<LensI> {
    return this.http.patch<LensI>(`${this.baseUrl}/${id}`, lens, { headers: this.getHeaders() });
  }

  deleteLens(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteLensLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de clientes
  updateLocalLenses(lens: LensI[]): void {
    this.lensSubject.next(lens);
  }

  refreshLenses(): void {
    this.getAllLenses().subscribe(lens => {
      this.lensSubject.next(lens);
    });
  }
}

