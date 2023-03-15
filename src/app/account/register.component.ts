import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'haidesu-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formbuilder: FormBuilder) {
  }

  // deze getter werkt niet met de nieuwe manier van controls opvragen ['controleName']
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
    this.submitted=true;
    console.log(this.registrationForm.getRawValue());
    console.log(this.registrationForm.valid);
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
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
