import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-form',
  templateUrl: './scroll-to-top-form.component.html',
  styleUrls: ['./scroll-to-top-form.component.css']
})
export class ScrollToTopFormComponent {
  windowScrolled: boolean = false;
  constructor() {}
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.scrollY || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop(): void {
    (function smoothscroll(): void {
      let currentScroll: number = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, 0);
      }
    })();
  }
}
