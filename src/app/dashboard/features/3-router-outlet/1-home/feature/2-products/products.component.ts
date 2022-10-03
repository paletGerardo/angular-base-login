import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from "../../../../../../core/http/http-wrapper.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( public httpWrapperService : HttpWrapperService) {

    // todo inyectar servicio http-wrapper
  }

  ngOnInit(): void {
    this.httpWrapperService
    // todo llamar a servicio de catalogo con http GET y obtener productos response.
  }

  // todo get productos

}
