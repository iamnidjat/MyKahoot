import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChangeBg3]'
})

export class AppChangeBg3Directive implements OnChanges{
  @Input() isCorrect: boolean = false;
  @Input() isUserAnswer: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');

    if (this.isUserAnswer) {
      if (this.isCorrect) {
        this.renderer.setStyle(this.el.nativeElement, 'background', 'green');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid grey');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid grey');
      }
     // this.isUserAnswer = false;
    }
  }
}

