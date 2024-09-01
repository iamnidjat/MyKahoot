import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-allow-to-download-popup-form',
  templateUrl: './allow-to-download-popup-form.component.html',
  styleUrls: ['./allow-to-download-popup-form.component.css']
})
export class AllowToDownloadPopupFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  public flag: boolean = false;

  constructor(private el: ElementRef) {}

  public closeModal(): void {
    this.close.emit();
  }

  public async chooseAction(e: any): Promise<void>{
    if (e.target.value === 'Yes') {
      localStorage.setItem("allowedToDownload", "true");
      this.closeModal();
    }
    else {
      this.closeModal();
      localStorage.setItem("allowedToDownload", "false");
    }
    this.flag = true;
  }
}
