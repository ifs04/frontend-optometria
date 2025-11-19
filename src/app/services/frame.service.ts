import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { FrameI } from '../models/frame';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  private baseUrl = 'http://localhost:3000/frames/public';
  private framesSubject = new BehaviorSubject<FrameI[]>([]);
  public frames$ = this.framesSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  // Obtener todos los Frames
  getAllFrames(): Observable<FrameI[]> {
    return this.http.get<FrameI[]>(this.baseUrl);
  }

  // Obtener un frame por ID
  getFrameById(id: number): Observable<FrameI> {
    return this.http.get<FrameI>(`${this.baseUrl}/${id}`);
  }

  // Crear un frame
  createFrame(frame: FrameI): Observable<FrameI> {
    return this.http.post<FrameI>(this.baseUrl, frame);
  }

  // Actualizar un frame
  updateFrame(id: number, frame: FrameI): Observable<FrameI> {
    return this.http.patch<FrameI>(`${this.baseUrl}/${id}`, frame);
  }

  // Eliminar un frame
  deleteFrame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Eliminar lógico
  deleteFrameLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`);
  }

  // Actualizar estado local
  updateLocalFrames(frames: FrameI[]): void {
    this.framesSubject.next(frames);
  }

  // Recargar frames desde API
  refreshFrames(): void {
    this.getAllFrames().subscribe(frames => {
      this.framesSubject.next(frames);
    });
  }
}
