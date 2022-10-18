import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from 'src/app/core/http/http-wrapper.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-regret-button',
  templateUrl: './regret-button.component.html',
  styleUrls: ['./regret-button.component.scss'],
})
export class RegretButtonComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /*forma: FormGroup = new FormGroup({});

  constructor(public HttpWS: HttpWrapperService, private fb: FormBuilder) {
    this.createForm();
    this.continuar();
    this.HttpWS.save();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      nombre: ['facundo'],
      apellido: ['acuña'],
      numero_de_documento: ['1233456'],
      email: ['facuna30@gmail.com'],
      telefono: ['2494595444'],
      area: ['1'],
      poliza: ['1'],
    });
  }
  continuar() {
    this.HttpWS.postRegret('http://localhost:4200/registro', this.forma.value);

    this.HttpWS.formdata.nombre = this.forma.value.nombre;
    this.HttpWS.formdata.apellido = this.forma.value.apellido;
    this.HttpWS.formdata.numero_de_documento = this.forma.value.edad;
    this.HttpWS.formdata.email = this.forma.value.correo;
    this.HttpWS.formdata.telefono = this.forma.value.telefono;
    this.HttpWS.formdata.area = 1;
    this.HttpWS.formdata.poliza = 1;
    console.log(this.HttpWS.formdata);
  }
  save() {
    console.warn(this.forma.value);
  }*/
}
