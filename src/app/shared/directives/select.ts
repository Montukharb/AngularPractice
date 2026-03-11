import {  Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSelect]',
})
export class Select implements OnInit {
  protected template = inject(TemplateRef)
  protected vcr = inject(ViewContainerRef);
  constructor() { }

  selectFrom = input();
  ngOnInit(){
      if(this.selectFrom())
      {

        this.vcr.clear();
        this.vcr.createEmbeddedView(this.template);   
      }

  }
 
  }

