import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { VisualExamI } from '../models/visual-exam';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class VisualExamService {
  private baseUrl = 'http://localhost:3000/visual-exams/public';
  private visualExamsSubject = new BehaviorSubject<VisualExamI[]>([]);
  visualExams$ = this.visualExamsSubject.asObservable();


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


  getAllVisualExams(): Observable<VisualExamI[]> {
    return this.http.get<VisualExamI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched clients:', response);
    //     })
    // )
    ;
  }

  getVisualExamById(id: number): Observable<VisualExamI> {
    return this.http.get<VisualExamI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createVisualExam(exam: VisualExamI): Observable<VisualExamI> {
    return this.http.post<VisualExamI>(this.baseUrl, exam, { headers: this.getHeaders() });
  }

  updateVisualExam(id: number, exam: VisualExamI): Observable<VisualExamI> {
    return this.http.patch<VisualExamI>(`${this.baseUrl}/${id}`, exam, { headers: this.getHeaders() });
  }

  deleteVisualExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteVisualExamLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de clientes
  updateLocalVisualExams(exams: VisualExamI[]): void {
    this.visualExamsSubject.next(exams);
  }

  refreshClients(): void {
    this.getAllVisualExams().subscribe(exams => {
      this.visualExamsSubject.next(exams);
    });
  }
}
