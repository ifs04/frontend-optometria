import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside implements OnInit{
  items: MenuItem[] | undefined;
  ngOnInit() {
        this.items = [
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/patients',
      },
      {
        label: 'Historia Visual',
        icon: 'pi pi-fw pi-book',
        routerLink: '/visual-histories',
      },
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/appointments',
      },
      {
        label: 'Optometras',
        icon: 'pi pi-fw pi-id-card',
        routerLink: '/optometrists',
      },
      {
        label: 'Mediciones',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: '/visual-exams',
      },
      {
        label: 'Armazones',
        icon: 'pi pi-fw pi-clone',
        routerLink: '/frames',
      },
      {
        label: 'Lentes',
        icon: 'pi pi-fw pi-eye',
        routerLink: '/lenses',
      },
      {
        label: 'Órdenes',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/orders',
      },
      {
      label: 'Detalle de Órdenes',
      icon: 'pi pi-list',
      routerLink: ['/order-details']
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-fw pi-truck',
        routerLink: '/suppliers',
      },
      {
        label: 'Pagos',
        icon: 'pi pi-fw pi-credit-card',
        routerLink: '/payments',
      },
      {
        label: 'Entregas',
        icon: 'pi pi-fw pi-send',
        routerLink: '/deliveries',
      }
    ];
  }
  
}
