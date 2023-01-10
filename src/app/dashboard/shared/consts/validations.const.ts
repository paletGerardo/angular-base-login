const TYPE = {
    REQUIRED: 'required',
    PATTERN: 'pattern',
    MINLENGTH: 'minlength',
    MAXLENGTH: 'maxlength',
    EMAIL:'email',
    TOUCHED:'touched'
  }
  
  export const VALIDATION_MESSAGES = {
    email:  [
      {
        type:  TYPE.REQUIRED,
        message:  'Ingrese su email',
      },
      {
        type: TYPE.PATTERN,
        message: 'El email ingresado no es un formato correcto'
      },
      {
        type: TYPE.EMAIL,
        message: 'El email ingresado no es un formato correcto'
      },

    ],
  
    name: [
      {
        type: TYPE.REQUIRED,
        message: 'El nombre es requerido.'
      },
      {
        type: TYPE.PATTERN,
        message: 'Solo se aceptan letras.'
      },
      {
        type: TYPE.MINLENGTH,
        message: 'El nombre debe tener al menos 3 caracteres.'
      },
      
     
    ],
    lastname: [
        {
          type: TYPE.REQUIRED,
          message: 'El apellido es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'Solo se aceptan letras.'
        },
        {
            type: TYPE.MINLENGTH,
            message: 'El apellido debe tener al menos 2 caracteres.'
          },
          {
            type: TYPE.MAXLENGTH,
            message: 'El maximo permitido es 20'
          },
      
      ],
      nationality: [
        {
          type: TYPE.REQUIRED,
          message: 'La nacionalidad es requerida.'
        },
       
         
      ],
      birthdate: [
        {
          type: TYPE.REQUIRED,
          message: 'La fecha de nacimiento es requerida.'
        },
      ],
      document_type: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],
      document_number: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
        {
          type: TYPE.MINLENGTH,
          message: 'El documento debe tener 8 digitos'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo permitido es 8 digitos'
        },
      ],
      id_genre: [
        {
          type: TYPE.REQUIRED,
          message: 'Elija una opción'
        },
      ],
      address: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],
     
      number: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],
      city: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],
      province: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],
      zip: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
      ],
      cod_area: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo permitido es 5 digitos'
        },
      ],
      number_phone: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo permitido es 7 digitos'
        },
      ],
      relation: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],

      percentage: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo permitido es de 3 digitos'
        },
      ],



      //payForm///
      number_card: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
        {
          type: TYPE.MINLENGTH,
          message: 'el minimo es de 13 digitos'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo es de 18 digitos'
        },
       
      ],
      expiration: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
       
      ],
      security_code: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan numeros'
        },
        {
          type: TYPE.MINLENGTH,
          message: 'El minimo es de 3 digitos'
        },
        {
          type: TYPE.MAXLENGTH,
          message: 'El maximo permitido es de 3 digitos'
        },
      
      ],
      cardholder: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
        {
          type: TYPE.PATTERN,
          message: 'solo se aceptan letras'
        },
       
      ],


     
  };
  
