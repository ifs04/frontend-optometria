import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { VisualExamI } from '../models/visual-exam';


@Injectable({
  providedIn: 'root'
})
export class VisualExamService {
  private visualExamsService = new BehaviorSubject<VisualExamI[]>([
    {
      id: 1,
      appointmentId: 1,
      date: '2025-09-12T10:00:00Z',
      prescription: 'Paciente con miopía leve',
      od: {
        esf: -1.25,
        cyl: -0.50,
        axis: 90,
        dp: 63
      },
      oi: {
        esf: -1.00,
        cyl: -0.25,
        axis: 95,
        dp: 63
      }
    },
    {
      id: 2,
      appointmentId: 2,
      date: '2025-09-12T11:00:00Z',
      prescription: 'Hipermetropía leve, sin astigmatismo',
      od: {
        esf: +0.75,
        cyl: 0,
        axis: 0,
        dp: 62
      },
      oi: {
        esf: +0.50,
        cyl: 0,
        axis: 0,
        dp: 62
      }
    }
  ]);
  visualExams$ = this.visualExamsService.asObservable();

  getVisualExams() {
    return this.visualExamsService.value;
  }

  addVisualExam(visualExam: VisualExamI) {
    const visualExams = this.visualExamsService.value;
    visualExam.id = visualExams.length ? Math.max(...visualExams.map(v => v.id ?? 0)) + 1 : 1;
    this.visualExamsService.next([...visualExams, visualExam]);
  }
}