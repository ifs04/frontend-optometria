import { Injectable } from '@angular/core';
import { VisualHistoryI } from '../models/visual-history';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class VisualHistoryService {
private visualhistoriesService = new BehaviorSubject<VisualHistoryI[]>([
    {
      id: 1,
      patientId: 1,
      observations: 'Paciente con miopía leve y astigmatismo. Se recomienda uso de lentes correctivos y seguimiento anual.',
      date: new Date('2025-10-01'),
      
    },
    {
    id: 2,
    patientId: 2,
    observations: 'Hipermetropía leve sin astigmatismo. No requiere corrección inmediata, control en 2 años.',
    date: new Date('2025-10-05'),
   },
   {
    id: 3,
    patientId: 3,
    observations: 'Miopía moderada con astigmatismo. Requiere lentes correctivos de uso permanente.',
    date: new Date('2025-11-12'),
  },
  ]);
  visualhistories$ = this.visualhistoriesService.asObservable();

  getHistories() {
    return this.visualhistoriesService.value;
  }

  addHistories(visualHistory: VisualHistoryI) {
    const visualHistories = this.visualhistoriesService.value;
    visualHistory.id = visualHistories.length ? Math.max(...visualHistories.map(history => history.id ?? 0)) + 1 : 1;
    this.visualhistoriesService.next([...visualHistories, visualHistory]);
  }
}

