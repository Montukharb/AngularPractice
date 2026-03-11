import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
@Component({
  selector: 'app-setting',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
  standalone:true,
})
export class Setting implements OnInit{

  router = inject(ActivatedRoute); //provide reactive 

  
  ngOnInit()
  {
    console.log("URL = " +this.router.snapshot.url);
    // console.log("Data = " +this.router.snapshot.params['id']);
    console.log("Title = " +this.router.snapshot.title);
  }

  name = new FormControl('userName');  //Track the value and validation status of an individual for control.
  
  


  protected getData():void
  {

    if(!this.name.value?.trim())
    {
     console.log("Please enter name"); 
     this.name.setValue('Dr.jhatka')
     
    }
    console.log(this.name.value)
  }


  protected formControl = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('')
  })

  protected setvalue():void{
  //  1. way to set value programmatically
    /* this.formControl.setValue({
       userName:'montu',   setValue method strict hai formgroup par lagane ka bad sabhi formcontrol ki value deni hoti hai nahi to error
     })*/ 
    
     //2. way to set value programmaticaly path value isme eak control ko bhi set kar sakte hai 
   /* this.formControl.patchValue({
      userName:'Montu kharb',
            // email set karni ki need nahi hai to chod sakte hai optional hai  
    }) */

  //3. way to get controller and set
  
    this.formControl.get('userName')?.setValue('Montu kharb');  // ye bhi correct hai kisi eak controller ki value set karne ka liya.
  }

 
  protected submitData():void
  {
    //  console.log(this.formControl.get('userName')?.value)
    console.log(this.formControl.value);
    
  }

  data = this.formControl.valueChanges.subscribe((d)=>{
    console.log(d);
  })
  constructor(){
    effect(()=>{
      this.data;
    })
    // this.unifiedControlsEvents;
  this.unifiedControlsEvents();

  }
  
  protected submitCapture():void{
     console.log("using submit event = ", this.formControl.value)
  }


  //alag se form group hai
  protected addressGroup = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    block: new FormControl(''),
    pincode: new FormGroup({
      villagePinCode: new FormControl(''),
      statePinCode: new FormControl(''),
      countryPinCode: new FormControl('')
    }),
    

  })

 protected addressGroupData():void{
    console.log("address form group =",this.addressGroup.value);
  }


  //form control se code repeatitive hota hai is liya formbuilder ka use kiya hai
  /* 
    There are three steps to create Formbuilder 
    1. import formbuilder
    2. inject services formbuilder
    3. create formbuilder.form 
    note : form builder provide all methods like group, control, array as like Normal FormGroups provide
  */ 
  private formBuilderServices = inject(FormBuilder);

  protected formbuilderGroup = this.formBuilderServices.group({
     userName: ['',Validators.required],  
     email:['',[Validators.required,Validators.email]],
     phoneNumber:['',Validators.required],
     address: this.formBuilderServices.group({
       street: ['',Validators.required],
       city: ['',Validators.required],
       block: ['',Validators.required],
       }),
       aliases: this.formBuilderServices.array([
        this.formBuilderServices.control('',Validators.required)
       ])
  })

  protected formBuilderSubmit():void{
  console.log("Form builder group data = ",this.formbuilderGroup.value);
  // console.log("Form array" , this.formbuilderGroup.controls.aliase)  
}

get errorhandler(){
  return this.formbuilderGroup;
}

get aliase(){

   return this.formbuilderGroup.get('aliases') as FormArray;
}
addAlias():void{
  this.aliase.push(this.formBuilderServices.control('',Validators.required));
}

protected saveSkills()
{
  console.log(this.aliase.value);
  this.aliase.reset();  //save hone ka bad reset ho zaye form field.
  
}

protected removeAliase(){
  if(this.aliase.controls.length>1)
  {
    for(let i = this.aliase.controls.length; i>=1; i--)
    {
      if(i===0)
      {
        return;
      }
      this.aliase.removeAt(i);
    }
  }

//both code are works best second way to easy understand and remove but ye bhi aise hi work kare ga sabko clear kare ga fir add kare ga n time loop isme bhi hia better performance ka liya upper wala best hoga kyuki usme n time loop hi run ho raha ha new item dubara se create nahi ho raha 

  // this.aliase.clear();
  // this.addAlias();
}

//  protected unifiedControlsEvents = effect(()=>{
//     this.aliase.events.subscribe((events)=>{
//       if(events instanceof ValueChangeEvent)
//       {
//         console.log("Value change event = " , events.value)
//       }
//     })
//   })
  protected unifiedControlsEvents = computed(()=>{
       this.aliase.events.subscribe((events)=>{
        if(events instanceof ValueChangeEvent)
        {
          console.log("Value change event = " , events.value)
        }
       })
  })
}
