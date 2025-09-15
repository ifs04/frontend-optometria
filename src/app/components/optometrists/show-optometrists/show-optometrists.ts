import { Component, ViewEncapsulation  } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OptometristI } from '../../../models/ optometrist';
import { OptometristService } from '../../../services/optometrist.service';



@Component({
  selector: 'app-show-optometrists',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './show-optometrists.html',
  styleUrl: './show-optometrists.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowOptometrists {
  optometrists: OptometristI[] = [];

  constructor(private optometristService: OptometristService) {
    this.optometristService.optometrists$.subscribe(optometrists => {
      this.optometrists = optometrists;
    });
  }
  
}
