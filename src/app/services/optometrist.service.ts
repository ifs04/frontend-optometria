import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { OptometristI } from '../models/ optometrist';


@Injectable({
  providedIn: 'root'
})
export class OptometristService {
  private optometristsService = new BehaviorSubject<OptometristI[]>([
    {
      id: 1,
      name: 'John Castro',
      specialty: 'PEDIATRICA',
      phone: '3005512341',
      email: 'john@gmail.com',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Jane Salas',
      specialty: 'GERIATRICA',
      phone: '3055678481',
      email: 'jane@gmail.com',
      status: 'INACTIVE'
    }
  ]);
  optometrists$ = this.optometristsService.asObservable();

  getOptometrists() {
    return this.optometristsService.value;
  }

  addOptometrist(optometrist: OptometristI) {
    const optometrists = this.optometristsService.value;
    optometrist.id = optometrists.length ? Math.max(...optometrists.map(opt => opt.id ?? 0)) + 1 : 1;
    this.optometristsService.next([...optometrists, optometrist]);
  }
}