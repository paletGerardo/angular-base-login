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
      
      ],
      nationality: [
        {
          type: TYPE.REQUIRED,
          message: 'La nacionalidad es requerida.'
        },
        {
          type: TYPE.PATTERN,
          message: 'Solo se aceptan letras.'
        },
        {
            type: TYPE.MINLENGTH,
            message: 'La nacionalidad debe tener al menos 2 caracteres.'
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
      ],
      number_phone: [
        {
          type: TYPE.REQUIRED,
          message: 'Este campo es requerido.'
        },
      ],

     
  };
  
