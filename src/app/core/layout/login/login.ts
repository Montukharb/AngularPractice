import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected auth = inject(Auth); //service
    protected access(){
      this.auth.login();  
    }
}
