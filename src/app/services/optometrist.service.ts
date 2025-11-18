import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { OptometristI } from '../models/ optometrist';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OptometristService {
  private baseUrl = 'http://localhost:3000/optometrists/public';
  private optometristsSubject = new BehaviorSubject<OptometristI[]>([]);
  optometrists$ = this.optometristsSubject.asObservable();

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


  getAllOptometrists(): Observable<OptometristI[]> {
    return this.http.get<OptometristI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getOptometristById(id: number): Observable<OptometristI> {
    return this.http.get<OptometristI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createOptometrist(optometrist: OptometristI): Observable<OptometristI> {
    return this.http.post<OptometristI>(this.baseUrl, optometrist, { headers: this.getHeaders() });
  }

  updateOptometrist(id: number, optometrist: OptometristI): Observable<OptometristI> {
    return this.http.patch<OptometristI>(`${this.baseUrl}/${id}`, optometrist, { headers: this.getHeaders() });
  }

  deleteOptometrist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteOptometristLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de clientes
  updateLocalOptometrists(optometrists: OptometristI[]): void {
    this.optometristsSubject.next(optometrists);
  }

  refreshOptometrists(): void {
    this.getAllOptometrists().subscribe(optometrists => {
      this.optometristsSubject.next(optometrists);
    });
  }
}
