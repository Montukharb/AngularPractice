import { Component, inject} from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  logout = inject(Auth);   
  router = inject(Router);
  logoutF()
  {
    this.logout.logout();
    this.router.navigate(['/login']);
  }


}
