import { Component, ViewEncapsulation  } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OptometristI } from '../../../models/ optometrist';
import { OptometristService } from '../../../services/optometrist.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-show-optometrists',
  imports: [TableModule, CommonModule, ButtonModule, RouterModule, ConfirmDialogModule, ToastModule],
  templateUrl: './show-optometrists.html',
  styleUrl: './show-optometrists.css',
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class ShowOptometrists {
  optometrists: OptometristI[] = [];
   loading: boolean = false;


  constructor(private optometristService: OptometristService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {
    this.loadOptometrists();
  }
   loadOptometrists(): void {
    this.loading = true;
    this.optometristService.getAllOptometrists().subscribe({
      next: (optometrists) => {
        this.optometrists = optometrists;
        this.optometristService.updateLocalOptometrists(optometrists);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading optometrists:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los optometras'
        });
        this.loading = false;
      }
    });
  }

  deleteOptometrist(optometrist: OptometristI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el optometra ${optometrist.name}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (optometrist.id) {
          this.optometristService.deleteOptometrist(optometrist.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Optometra eliminado correctamente'
              });
              this.loadOptometrists();
            },
            error: (error) => {
              console.error('Error deleting optometrist:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el optometra'
              });
            }
          });
        }
      }
    });
  }
}
