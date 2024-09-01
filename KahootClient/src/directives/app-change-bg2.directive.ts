import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAppChangeBg2]'
})
export class AppChangeBg2Directive implements OnInit{
  @Input() isCorrect: boolean = false; // Indicates if the answer is correct
  @Input() isUserAnswer: boolean = false; // Indicates if this is the user's answer
  @Input() isCorrectAnswer: boolean = false; // Indicates if this is the correct answer

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.applyStyles();
    }, 100);
  }

  private applyStyles(): void {
    if (this.isCorrectAnswer) {
      this.render.setStyle(this.el.nativeElement, 'background', 'green');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    }
    if (this.isUserAnswer) {
      if (this.isCorrect) {
        this.render.setStyle(this.el.nativeElement, 'background', 'green');
        this.render.setStyle(this.el.nativeElement, 'color', '#fff');
        this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
      }
      else {
        this.render.setStyle(this.el.nativeElement, 'background', 'red');
        this.render.setStyle(this.el.nativeElement, 'color', '#fff');
        this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
      }
    }
  }
}
