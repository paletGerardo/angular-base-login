import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../model/user.model";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  user!: UserModel;
  recordarme = false;
  registerForm = new FormGroup({});
  hidePassword = true;



  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,


  ) { }

  ngOnInit() {
    this.registerForm = this.buildForm(); }

  buildForm(): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      name: ['', Validators.required]

    });
    return form;
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'Ingrese un email correcto'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña debe de ser más de 6 letras'
      }
    ],

    name: [
      {
        type: 'required',
        message: 'El nombre debe requerir al menos 6 letras'
      }
    ],
  };

  onSubmit(){


  }




}
