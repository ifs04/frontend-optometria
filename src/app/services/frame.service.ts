import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FrameI } from '../models/frame';

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  private framesService = new BehaviorSubject<FrameI[]>([
     {
      id: 1,
      brand: 'Ray-Ban',
      model: 'RB2140',
      material: 'Acetato',
      color: 'Negro',
      price: 150000,
      stock: 10,
      supplierId: 1,
      image: 'https://images2.ray-ban.com//cdn-record-files-pi/46a585d2-0b37-410d-b309-ae90017fd47b/e1fca6ed-1224-4dcb-a5ad-ae90017fda37/0RB3016__1367B1__P21__shad__qt.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2'
    },
    {
      id: 2,
      brand: 'Oakley',
      model: 'OX3007',
      material: 'Metal',
      color: 'Plateado',
      price: 200000,
      stock: 5,
      supplierId: 2,
      image: 'https://tiendasoa.com/cdn/shop/files/142.png?v=1725654075&width=1946'

    }
  ]);
  frames$ = this.framesService.asObservable();

  getFrames() {
    return this.framesService.value;
  }

  addFrame(frame: FrameI) {
    const frames = this.framesService.value;
    frame.id = frames.length ? Math.max(...frames.map(frame => frame.id ?? 0)) + 1 : 1;
    this.framesService.next([...frames, frame]);
  }
}