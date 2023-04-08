import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../_alert/alert.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../_models/user";
import {first} from "rxjs";

@Component({
  selector: 'haidesu-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(private formbuilder: FormBuilder,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private toastrService: ToastrService) {
  }

  // een getter om minder bloat in de template te hebben
  // f == registrationForm.controls
  get f() {
    return this.registrationForm.controls
  }

  ngOnInit() {
    this.registrationForm = this.formbuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {validator: ConfirmPasswordValidator('password', 'confirmPassword')});
  }

  onSubmit() {
    this.loading = true;
    console.log(this.registrationForm.getRawValue());
    console.log(this.registrationForm.valid);
    if (!this.registrationForm.valid) {
      return;
    }
    this.accountService.register(this.registrationForm.getRawValue() as User)
      .pipe(first())
      .subscribe({
        next: user => {
          console.log(user);
          this.toastrService.success('You can now login', 'Registration successful!');
          this.alertService.success('You can now login', 'Registration successful!');
          this.router.navigateByUrl('/login')
        },
        error: error => {
          console.log(error);
          this.toastrService.error(error.error.message, error.error.code, {timeOut: 5000});
          this.alertService.error(error.error.message, error.error.code);
          this.loading=false
        }
      });
  }
}

// an example of how to create a custom validator to use in your forms
  export function ConfirmPasswordValidator(password: string, confirmPassword: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
