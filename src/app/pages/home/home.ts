import { AfterViewInit, Component, computed, ElementRef, inject, linkedSignal, OnInit, resource, Signal, signal, TemplateRef, viewChild, viewChildren, ViewContainerRef, WritableSignal } from '@angular/core';
import { About } from '../../about/about';
import { Card } from '../../card/card';
import { isPlatformBrowser, NgComponentOutlet, NgTemplateOutlet, NgOptimizedImage, CurrencyPipe, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../contact/contact';
import { Address } from '../address/address';
import { CustomPipePipe } from '../../shared/pipe/custom-pipe-pipe';
import { Highlight } from '../../shared/directives/highlight';
import { Select } from '../../shared/directives/select';
import { BasicDataStore } from '../../core/services/basic-data-store';
import { API_URL, LOCAL_STORAGE, APP_CONFIG } from '../../core/tokens/app.token';
import { MannualConfigurationService } from '../../core/services/mannual-configuration-service';
import { Navbar } from '../../core/layout/navbar/navbar/navbar';
type labelStatus = {
  status: boolean;
}
// LOCAL_STORAGE
// type userdetails = {
//    name:string,
//    age?: number,
//    city?: string
// }
@Component({
  selector: 'app-home',
  imports: [About, Card, NgComponentOutlet, NgTemplateOutlet, NgOptimizedImage, CurrencyPipe, DatePipe, DecimalPipe, TitleCasePipe, CustomPipePipe, Address, Highlight, Select],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.Default,
  // preserveWhitespaces:true, // enable kar de jab template me whitespace preserve karna ho by default angular template me extra white space remove kar deta hai.

  providers: [MannualConfigurationService]
})
export class Home implements OnInit, AfterViewInit {

  protected platformid = inject(PLATFORM_ID)
  protected readonly title = signal('TestAll_Features');

  protected count: WritableSignal<number> = signal(0);

  protected increase(): void {
    this.count.update((value) => value + 1);
  }
  protected decrease(): void {
    this.count.update((value) => value - 1);
  }

  protected counter(value: string): void {
    if (value === 'inc') {
      this.increase();
    }
    else if (value === 'dec') {
      this.decrease();
    }
    else {
      this.count.set(0); //reset counter value;
    }
  }

  protected doublecount: Signal<number> = computed(() => this.count() * 2);
  //computed signal is a signal that is derived from other signal values and can be used to calculate new values it is depended on other signal values.

  protected category: WritableSignal<string[]> = signal(["Grocery", "Medicos", "Movies", "Fresh-up", "Secret-Products"]);

  protected selecteditem: Signal<string> = linkedSignal(() => {
    return this.category()[0];
  })

  changeCategory() {
    this.category.set(["Computer", "Glasses", "Books"]);
  }
  protected url: WritableSignal<string> = signal("https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU");
  userId: WritableSignal<number> = signal(1);
  disabled: WritableSignal<boolean> = signal(false);
  protected userResource = resource({
    params: () => ({ id: this.userId() }),

    loader: async ({ params, abortSignal }) => {
      const response = await fetch(`https://picsum.photos/v2/list?&limit=100`, { signal: abortSignal });
      if (response.status === 404) {
        this.disabled.set(true);
        throw new Error("User not found");
      }

      if (!response.ok) {
        throw new Error("Network error");
      }

      return await response.json();
    }

  })


  // protected username = computed(() => {
  //   return this.userResource.hasValue() ? this.userResource.value().userId : 'Not provided';
  // })

  changeUserID() {

    this.userId.update((value) => {
      return value + 1;
    });
  }

  protected openFullImage(): void {
    window.open(this.userResource.value()[this.userId()].download_url, "_blank", "width=800,height=600",);
  }

  //  constructor(){
  //    effect((cleanup)=>{

  //     cleanup(()=>{

  //     });
  //    })
  // }

  // protected injector = inject(Injector);

  // logineffect = effect(()=>{

  // },{injector:this.injector})

  // stopLogineffect(){
  //   this.logineffect.destroy();
  // }

  volume = signal(101n);


  panel(value: number) {
    console.log(value);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformid)) {
      // alert(`ngOnInit ${this.platformid} `);
      document.getElementById('demo')?.addEventListener('click', () => {
        // alert("hello test dom api ");
      })
    }

  }

  constructor() {
    if (isPlatformBrowser(this.platformid)) {
      // alert("Constructor alert run first");
    }
    this.grettingInputs.update((prev) => {
      return {
        ...prev,
        age: 204,
      }

    })


  }
  // ngOnChanges(changes: SimpleChanges<App>) {
  //   if (changes.userId) {
  //     console.log("changes detected")
  //   }
  // }

  protected elementref: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild<ElementRef<HTMLDivElement>>('demo');
  protected navbarElement: Signal<Navbar | undefined > = viewChild(Navbar)
  // protected navbarElement: Signal<Navbar | undefined > = viewChild(Navbar,{read:ElementRef})

  protected aboutElement: Signal<readonly About[] | undefined> = viewChildren(About);
  protected cardElement: Signal<Card | undefined> = viewChild(Card);

  // protected ngtempElement:Signal<HTMLElement | undefined> = viewChild("ngtemp");
  ngAfterViewInit(): void {
    // let data = this.elementref?. () as ElementRef<HTMLDivElement>;

    console.log(this.elementref()?.nativeElement.textContent)
    // this.navbarElement()?.tes
    
    // let data = this.navbarElement();

    // console.log("nabar variable data = " + data);

    // let result = this.aboutElement()?.map((item)=>
    // {
    //   return item.text;
    // })
    // console.log(result)
    this.aboutElement()?.map((item) => console.log("about text = " + item.text));
    console.log("card text = ", this.cardElement()?.cardtext);
  }

  protected user: labelStatus = {
    status: false,
  }

  protected getComponent(): typeof Contact | typeof Address {
    return this.user.status ? Contact : Address;
  }
  protected grettingInputs = signal({
    name: "John",
    age: 30,
    city: "New York",
  })

  vcr = inject(ViewContainerRef);
  protected template = viewChild<TemplateRef<any>>('showtemplate')
  protected loadComponent() {
    const template = this.template?.();  //null check
    if (template) {
      this.vcr.clear();
      // this.vcr.createEmbeddedView(this.template()!);  //working mode hai efficient nahi hai
      this.vcr.createEmbeddedView(template);
    }
  }

  protected unloadComponent() {
    if (this.template?.()) {
      this.vcr.clear();
    }
  }

  protected isDisabled: WritableSignal<boolean> = signal(true);

  protected isActive: WritableSignal<boolean> = signal(false);
  // protected Customboder:string = "border border-2 border-black rounded container p-2";
  // protected CustomUtility:WritableSignal<string[]> = signal([`${Array.from(this.Customboder).join('')}`]);
  protected CustomUtility = ['border', 'border-2', 'border-black', 'rounded', 'container', 'p-2', 'mt-2']

  protected updateField(event: KeyboardEvent): void {
    if (isPlatformBrowser(this.platformid)) {
      if (event.key === 'Enter') {
        alert("enter key pressed")
        return;
      }
      alert(event.key)
    }
  }

  protected currency: number = 421.84;
  protected decistr = '234234';

  protected names = signal({
    firstname: "montu",
    lastname: 'kharb'
  })

  protected temp1 = viewChild('test1', { read: TemplateRef });
  protected temp2 = viewChild('test2', { read: TemplateRef });
  protected status: WritableSignal<boolean> = signal(false);

  protected loadTemplateDynamic = computed((): any => {
    return this.status() ? this.temp1() : this.temp2();

  })

  protected dynamic: WritableSignal<string> = signal("Welcome to Testing App");
  protected dynamicColor: WritableSignal<string> = signal('')

  protected sourceShow = true;

  protected CustomServiceData = inject(BasicDataStore);

  protected d = 0
  addData() {
    this.d += 10;
    this.CustomServiceData.addData(this.d);
  }

  protected getData: number[] = []

  protected getDataFun() {
    this.getData = this.CustomServiceData.getData();

  }


  //use injectionTokens here using inject keyword
  protected apiurl = inject(API_URL);
  protected localstorage = inject(LOCAL_STORAGE);
  protected appConfig = inject(APP_CONFIG);
  protected setLocalStorage() {
    this.localstorage.setItem('userName', "Montu kharb");
    if (isPlatformBrowser(this.platformid)) {
      alert("user name set and data is " + this.localstorage.getItem('userName'));
      return;
    }
  }


  //injection mannual Configuration service
  protected manConService = inject(MannualConfigurationService);

}
