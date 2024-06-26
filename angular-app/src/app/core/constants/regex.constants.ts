export const INTEGER_REGEXP: RegExp = /^[0-9]*$/;

export const PHONENUMBER_REGEXP: RegExp =
  /^(?:\+\d{1,3}\s?)?(?:(?:\(?\d{1,4}\)?[\s.-]?)?\d{7,10})$/;

export const DNI_REGEXP: RegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
