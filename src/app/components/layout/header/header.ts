import { Component } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
    OverlayBadgeModule,
    PopoverModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [ConfirmationService, MessageService],
})
export class Header {
  loginDialogVisible: boolean = false;
  registerDialogVisible: boolean = false;

  loginData = { username: '', password: '' };
  registerData = { username: '', email: '', password: '' };

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showLoginDialog() {
    this.loginDialogVisible = true;
  }

  showRegisterDialog() {
    this.registerDialogVisible = true;
  }

  onLoginSubmit() {
    console.log('Login:', this.loginData);
    this.loginDialogVisible = false;
  }

  onRegisterSubmit() {
    console.log('Register:', this.registerData);
    this.registerDialogVisible = false;
  }

  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget ?? undefined,
      message: '¿Seguro que deseas cerrar sesión?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onLogout();
      }
    });
  }

  onLogout() {
    console.log('Cerrando sesión');
    this.messageService.add({
      severity: 'info',
      summary: 'Sesión cerrada',
      detail: 'Hasta pronto!'
    });
  }
}
