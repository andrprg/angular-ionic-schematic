import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

/**
 * Обрезаем текст и добавляем троеточие в конце
 */
@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * На какой линии обрезаем
  */
  maxLines = input(1);

  ngAfterViewInit() {
      const container = this.el.nativeElement;
      this.renderer.setStyle(container, 'display', '-webkit-box');
      this.renderer.setStyle(container, '-webkit-box-orient', 'vertical');
      this.renderer.setStyle(container, '-webkit-line-clamp', this.maxLines().toString());
      this.renderer.setStyle(container, 'overflow', 'hidden');
      this.renderer.setStyle(container, 'text-overflow', 'hidellipsisden');
  }
}
