import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { fastWhiteBoard } from '../lib/fastWhiteBoard';

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.css'],
    imports: [CommonModule, FormsModule],
    standalone: true
})
export class DispositifSharedComponent implements OnInit {
    wb: any;
    ngOnInit() {
        this.wb = fastWhiteBoard("shared");
    }

    fullScreen() {
        console.log("fullscreen");
        this.wb.fullscreen();
    }
    
}