import { Component, ComponentFactoryResolver, ElementRef, OnInit, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef, private componentFactoryResolver:ComponentFactoryResolver) {
      this.element = el.nativeElement;
  }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.container.clear();
    const component = this.container.createComponent(componentFactory);
    this.open();
  }

  ngOnInit(): void {
    this.modalService.initializeModel(this);

    this.element.addEventListener('click', (el:any) => {
      if (el.target.className === 'jw-modal') {
          this.close();
      }
    });
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }

}
