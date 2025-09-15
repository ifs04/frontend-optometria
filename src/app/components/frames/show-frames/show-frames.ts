import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { FrameI } from '../../../models/frame';
import { FrameService } from '../../../services/frame.service';


@Component({
  selector: 'app-show-frames',
  imports: [TableModule,CommonModule,ButtonModule,RouterModule,TagModule,RatingModule, ImageModule],
  templateUrl: './show-frames.html',
  styleUrl: './show-frames.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowFrames {
  frames: FrameI[] = [];

  constructor(private frameService: FrameService) {}
  ngOnInit() {
    
    this.frameService.frames$.subscribe((data) => {
      this.frames = data;
    });
    
  }

}
