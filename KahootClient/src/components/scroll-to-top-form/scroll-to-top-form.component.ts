import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-form',
  templateUrl: './scroll-to-top-form.component.html',
  styleUrls: ['./scroll-to-top-form.component.css']
})
export class ScrollToTopFormComponent {
  public windowScrolled: boolean = false;

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.scrollY || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }
}
