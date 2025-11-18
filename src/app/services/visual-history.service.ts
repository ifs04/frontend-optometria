import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { VisualHistoryI } from '../models/visual-history';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class VisualHistoryService {
  private baseUrl = 'http://localhost:3000/visual-histories/public';
  private visualhistoriesSubject = new BehaviorSubject<VisualHistoryI[]>([]);
  visualhistories$ = this.visualhistoriesSubject.asObservable();



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

   getAllVisualHistories(): Observable<VisualHistoryI[]> {
    return this.http.get<VisualHistoryI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getVisualHistoryById(id: number): Observable<VisualHistoryI> {
    return this.http.get<VisualHistoryI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createVisualHistory(visualhistory: VisualHistoryI): Observable<VisualHistoryI> {
    return this.http.post<VisualHistoryI>(this.baseUrl, visualhistory, { headers: this.getHeaders() });
  }

  updateVisualHistory(id: number, visualhistory: VisualHistoryI): Observable<VisualHistoryI> {
    return this.http.patch<VisualHistoryI>(`${this.baseUrl}/${id}`, visualhistory, { headers: this.getHeaders() });
  }

  deleteVisualHistory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteClientLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de clientes
  updateLocalVisualHistories(visualhistories: VisualHistoryI[]): void {
    this.visualhistoriesSubject.next(visualhistories);
  }

  refreshVisualHistories(): void {
    this.getAllVisualHistories().subscribe(visualhistories => {
      this.visualhistoriesSubject.next(visualhistories);
    });
  }
}
