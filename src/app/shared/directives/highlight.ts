import { Directive, effect, ElementRef, inject, Injector, input } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  host:({
    '(mouseenter)':'onMouseEnter()',
  })
})
export class Highlight {

  private element = inject(ElementRef);  //direct dom element access hoga
  private platformId = inject(PLATFORM_ID);
  protected injector = inject(Injector);
  public appHighlight = input('');
  public nativeElement = this.element.nativeElement as HTMLElement;
constructor() {
  
  // this.nativeElement.style.backgroundColor = this.appHighlight();
  this.nativeElement.style.fontSize = '22px';
  
  this.nativeElement.addEventListener('click',()=>{
    //  window.close();
    
    
    if(isPlatformBrowser(this.platformId))
     {
      this.nativeElement.style.boxShadow = '2px 2px 2px 10px red';
      this.nativeElement.style.marginBottom = '1.5rem';
      this.nativeElement.style.border = '2px solid black';
      this.nativeElement.style.boxSizing = 'border-box';
      this.nativeElement.style.padding = '10px';
      effect(()=>{

        alert(`click event work  ${this.appHighlight()}`);
        this.nativeElement.style.backgroundColor = this.appHighlight();
      },{injector:this.injector})
     }
  })  
}
  count = 0;
  protected onMouseEnter(){
    // if(isPlatformBrowser(this.platformId) && this.count === 0)
    //   {
    //     alert("mouse enter in element where apply directive");
    //   }
    //   this.count++;
    console.log("mouse enter in element where apply directive");
  }
}
