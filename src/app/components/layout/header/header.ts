import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule,OverlayBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
