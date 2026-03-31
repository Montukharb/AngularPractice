import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, httpResource } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerRequests {

  private http = inject(HttpClient);

  protected header = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  //ye bhi use kar sakte hai more readable and easy
  //     protected headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer token'
  // });


  protected params = new HttpParams().set('id', 1).set('id', 2).append('id', 3);

  // httpParams aise bhi pas kar sakte hai agar bhut sare paramater pass karne ho 
  protected constructortypesendinghttpParams = new HttpParams({  
    fromObject:{
      id:1,
      filter:'all',
      sort:'asc'
    }
  })



  getAllUserData(url: string) {
    this.http.get(url
      , {
        params: this.params.set('another', 'data'),
        responseType: 'json',
        headers: this.header,

      }
    ).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Request Completed");
      }
    });
  };

  protected data = {
    name: 'john',
    age: 30,
    email: "john23@gmail.com",
  }
  sendData(url: string): void {
    this.http.post(url, this.data, { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams().set('id', 1), responseType: 'json', }
  ).subscribe({    //generally subscribe service ma nahi karte subscribe karte hai jaha use karna ho
    next:(res)=>console.log(res),
    error:(err)=>console.log(err),
    complete:()=>console.log('Request Completed')
  })
  }


  // isme multiple files ayegi as a array
  sendFile(file:File[]):void
  {
    const formdata = new FormData();  //this is used to send file and multiple files

    // formdata.append('file', file[0].name);
    // formdata.append('file',file[0]);
    Array.from(file).forEach((item,index)=>{
      formdata.append('filename',file[index].name);
      formdata.append('file',item);
    }) 
    this.http.post('url', formdata).subscribe(res=>console.log(res))
  }
  // image,pdf,excel,word,video,audio,zip,text  ye sab files ja sakti hai

  // progress bar code 
  /* <input type="file" (change)="onFileChange($event)">

  <div *ngIf="uploadProgress >= 0">
    Uploading: {{uploadProgress}}%
  </div>

  <progress [value]="uploadProgress" max="100"></progress>
  */

  uploadProgress = 0;
  file!: File;

  // file attribute create karne ka bad ausme file store karwa di hai onchange event par or sath ma event bhi pass kiya hai taki files ko track kar sake as htmlinputelement type casting ki hai 
  onFileChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
  }

  // yaha file upload ho rahi hai 
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file);  //only one file upload

    this.http.post('API_URL', formData, {
      reportProgress: true, //report progress true karne se http progress event mil zate hai
      observe: 'events'      //observe events se respone type check karke event set kar sakte hai 
    }).subscribe(event => {

      if(event.type === HttpEventType.UploadProgress){  //yaha par observe ka use karke track kiya jab upload progress as a response aa ri to isme loaded data ko divide kar do total data se and multiple kar ke 100 se round value kar di percentage ban gai hai

        const percent = Math.round(
          (event.loaded / (event.total ?? 1)) * 100
        );

        this.uploadProgress = percent;
      }

      if(event.type === HttpEventType.Response){   // yaha actual response aye ga successful ka error handling bhi kar sakte hia auske liya object type subscrbe kar lene next error complete karke hai 
        console.log("Upload complete");
      }

    });

  };

 
  // blob response main file download karne ka liya hota hai 
//   <button (click)="downloadReport()">
//   Download PDF
// </button>

// <p *ngIf="loading">Downloading...</p>



// import { Component, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { isPlatformBrowser } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html'
// })
// export class ReportComponent {

  // private http2 = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  loading = false;

  downloadReport(){

    this.loading = true; //program start loading indicator start

    this.http.get('/api/report',{
      responseType:'blob'  //blob response aye ga
    }).subscribe({

      next: (blob) => {

        if(isPlatformBrowser(this.platformId)){  //ssr redering hai isliya platform check karna padta hai

          const url = window.URL.createObjectURL(blob);  //url create ho gaya hai 

          const a = document.createElement('a');  //anchor tag created
          a.href = url;  //url set
          a.download = 'report.pdf';  //download name set
          a.click(); //download click automatic

          window.URL.revokeObjectURL(url);  //remove url from memory there are no leakage of memory
        }

        this.loading = false;  //download completed loading indicator stop

      },

      error: () => {
        console.log("Download failed");
        this.loading = false;  //error occured loading false 
      }

    });

  }

// Agar template pdf show karna hai usually blobe se nahi karte
// <iframe *ngIf="pdfUrl" [src]="pdfUrl" width="600" height="500"></iframe>
pdfUrl:any;

 //yaha par se ma only temperary save kiya hai vaise to funciton use karege
se = this.http.get('/api/report',{responseType:'blob'})
.subscribe({
  next:(blob)=>{
      if(isPlatformBrowser(this.platformId))
      {

        const url = window.URL.createObjectURL(blob);
        this.pdfUrl = url
        URL.revokeObjectURL(url); //cleanup 
      }
  }
});   


public employee = httpResource<any[]>(() => 'https://jsonplaceholder.typicode.com/users');
showusers():void{
  if(this.employee.isLoading())
  {
    console.log('loading... employe data')
  }
 else if(this.employee.hasValue())
  {
    // const data = JSON.stringify(this.employee.value());
    // console.log(JSON.parse(data)[0])
    console.log(this.employee.value()[0])
  }
  else if(this.employee.error())
  {
    console.log(this.employee.error())
  }
}



}  //class end


