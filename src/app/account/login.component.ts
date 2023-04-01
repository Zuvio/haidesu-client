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
  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private toastrService: ToastrService) { }

  onSubmit(loginForm : NgForm) {
    if(!loginForm.valid) {return;}
    this.accountService.login(this.email, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('You logged in with great power', 'Success')
          this.alertService.success("You logged in succesfully!")
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || ['/'];
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log('ERROR TIME :' + error);
        }
      })
  }
}
