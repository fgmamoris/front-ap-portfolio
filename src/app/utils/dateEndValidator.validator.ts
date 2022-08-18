import { AbstractControl, ValidationErrors } from '@angular/forms';

export const dateEndValidator = function (
  control: AbstractControl
): ValidationErrors | null {
  /*let value: string = control.value || '';
  let msg = '';
  if (!value) {
    return null;
  }

  if (value.indexOf(' ') >= 0) {
    return {
      removeSpaceFromUserName: true,
    };
  } else {
    return null;
  }
*/

  const { actual } = control.value; // Extraemos valores de ambos campos necesarios
  //const { fechaFinString } = control.value || null;
  if (actual) {
    return null; // Validación correcta, devolvemos null
  }
  return { validarEnd: true }; // validación incorrecta, devolvemos un error personalizado.
};
