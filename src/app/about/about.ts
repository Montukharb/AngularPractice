import { afterNextRender, Component, contentChild, contentChildren, ElementRef, inject, model, ModelSignal, OnInit, output, Signal } from '@angular/core';
import { Card } from '../card/card';


@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',

})
export class About implements OnInit {

  value: ModelSignal<bigint> = model<bigint | any>();
  pannelClose = output<number>();
  text = "lorem ipsum dolar"

  protected increment() {
    //send output our parent


    this.value.update(value => (value * 200n));
  }
  protected i = 1;
  close() {
    this.pannelClose.emit(this.i++);
  }

  ngOnInit(): void {
    console.log("About component initialized with value: ");
  }

  // protected contentelement = contentChildren(About,{descendants:true});

  // ngAfterContentInit():void{
  //    this.contentelement()?.forEach((item,index,array)=>{
  //     console.log("content items " + item.text)
  //   })
  //   }

  protected contentele: Signal<Card | undefined> = contentChild(Card);
  protected contentselement: Signal<readonly Card[] | undefined> = contentChildren(Card, { descendants: true });
  protected localref: Signal<ElementRef<HTMLElement> | undefined> = contentChild('localref');
  ngAfterContentInit(): void {
    console.log("Content child test = " + this.contentele()?.cardtext)

    this.contentselement()?.forEach((item, index, array) => console.log("cards contents chilrens = " + item.cardtext + "" + array.length))
    console.log(
      "local ref content = ",
      this.localref()?.nativeElement.innerText
    )
  }
  protected hostElement = inject(ElementRef)

  constructor() {
    afterNextRender(() => {
      console.log("host element = ", this.hostElement.nativeElement.querySelector("#lifecycle"))
    })
  }
}

