import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { AuthService } from '../../../services/auth.service';

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
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
