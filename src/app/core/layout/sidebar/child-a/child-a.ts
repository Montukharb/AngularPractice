import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-child-a',
  imports: [],
  templateUrl: './child-a.html',
  styleUrl: './child-a.css',
})
export class ChildA implements OnInit {
  protected route = inject(ActivatedRoute);  //current component route
  protected router = inject(Router);
  protected platformid = inject(PLATFORM_ID);

  leaveUser(): any {
    if (isPlatformBrowser(this.platformid)) {
      return confirm("Are you sure you want to leave?");

    }
  }







  protected navigateParent() {
    this.router.navigate(['..'], { relativeTo: this.route })

  }
  ngOnInit() {
    // setTimeout(()=>{

    //   console.log("---------" + this.route.snapshot.url)
    //   clearInterval(interval);
    // },5000)
    // let interval =setInterval(()=>{

    //   console.log("---------" + this.route.snapshot.url)
    // },1000)

    //
    // this.route.snapshot.paramMap.get('id')
    // this.route.queryParamMap.subscribe((data)=>{
    //   console.log(data.get('userId'))
    // })








  }
  //navigate using router.navigateByUrl() isme absolute path pass hote hai sab ka dynamic or relative nahi
  navigateRoot() {
    this.router.navigateByUrl('/', { replaceUrl: true }); //replace url ka use privious url clear karne ka liya jaise login se dashboard anne par broser ki history one step clear ho zaye gi

    // pass parameters and query params fragments etc
    // this.router.navigateByUrl('/123?id=1&name=montu#teamSection');
  }


  //prgrammatic navigation to routes
  // 1.standard
  //  this.route.navigate(['/setting/childA'])  

  // 2. with route parameters
  // this.route.navigate(['/setting/childA',userId]) dynamic hai userid

  // 3. with query parameters & #fragements
  // this.route.navigate(['/setting/childA'],{queryParams:{userId:1}},{
  //   fragement:'teamSection'
  // })
}
