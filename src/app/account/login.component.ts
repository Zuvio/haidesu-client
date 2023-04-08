import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../_alert/alert.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'haidesu-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email : string ='';
  password : string ='';
  loading = false;
  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private toastrService: ToastrService) { }

  onSubmit(loginForm : NgForm) {
    this.loading=true;
    if(!loginForm.valid) {return;}
    this.accountService.login(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('You have been logged in', 'Success')
          this.alertService.success("You have been logged in", 'Success')
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || ['/'];
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error)
          this.toastrService.error(error.error.message, error.error.code, {timeOut: 5000});
          this.alertService.error(error.error.message, error.error.code);
          this.loading=false
        }
      })
  }
}
