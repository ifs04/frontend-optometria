import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { LensI } from '../../../models/lens';
import { LensService } from '../../../services/lens.service';



@Component({
  selector: 'app-show-lenses',
  imports: [TableModule, CommonModule, ButtonModule,RouterModule,TagModule,ImageModule],
  templateUrl: './show-lenses.html',
  styleUrl: './show-lenses.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowLenses {
  lenses: LensI[] = [];

constructor(private lensService: LensService) {
    this.lensService.lenses$.subscribe(lenses => {
      this.lenses = lenses;
    });
  }
}