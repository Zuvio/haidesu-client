import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'haidesu-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading: boolean = false;
  email : string ='';
  password : string ='';
  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) { }

  onSubmit(loginForm : NgForm) {
    if(!loginForm.valid) {return;}
    this.loading = true;
    this.accountService.login(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || ['/'];
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log('ERROR TIME!');
          this.loading = false;
        }
      })
  }
}
