import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[componentDraggable]'
  })
  export class DraggableDirective {
    constructor(private el: ElementRef) {
      this.el.nativeElement.setAttribute('draggable', true);
    }
  
    @HostListener('dragstart', ['$event'])
    onDragStart(event: any) {
      const elementToBeDragged = event.target.getElementsByTagName('svg')[0];
      event.dataTransfer.setData('text', elementToBeDragged.id);
    }
  
    @HostListener('document:dragover', ['$event'])
    onDragOver(event: any) {
        event.preventDefault();
    }
  }