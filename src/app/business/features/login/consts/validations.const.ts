export const validationMessages = {
  email:  [
    {
      type:  'required',
      message:  'Ingrese su email',
    },
    {
      type: 'pattern',
      message: 'El email ingresado no es un formato correcto'
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
