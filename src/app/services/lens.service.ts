import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LensI } from '../models/lens';

@Injectable({
  providedIn: 'root'
})
export class LensService {
  private lensService = new BehaviorSubject<LensI[]>([
    {
      id: 1,
      image:'https://proyeccionvisual.com.co/wp-content/uploads/2020/10/combo5.1.jpg',
      type: 'Monofocal',
      material: 'Policarbonato',
      treatment: 'Antirreflejo',
      price: 100000,
      stock: 20,
      supplierId: 1
    },
    {
      id: 2,
      image:'https://images2.ray-ban.com//cdn-record-files-pi/7e5d2c4f-5762-4b17-948f-b0c1000e3789/17f2baa9-2eec-4ba8-8f84-b0c1000e3e39/0RB2140__1409B1__P21__shad__al3.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2',
      type: 'Bifocal',
      material: 'Vidrio',
      treatment: 'Fotocromático',
      price: 180000,
      stock: 15,
      supplierId: 2
    }
  ]);
  lenses$ = this.lensService.asObservable();

  getLenses() {
    return this.lensService.value;
  }

  addLens(lens: LensI) {
    const lenses = this.lensService.value;
    lens.id = lenses.length ? Math.max(...lenses.map(l => l.id ?? 0)) + 1 : 1;
    this.lensService.next([...lenses, lens]);
  }

}