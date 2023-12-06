import { Pipe, PipeTransform } from '@angular/core';

import { GENDER_OPTIONS } from 'src/app/core/constants/options/genders-options.constants';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(gender: string | null | undefined): string {
    const genderOption = GENDER_OPTIONS.find(
      (option) => option.value === gender
    );

    return genderOption ? genderOption.text : 'Otro';
  }
}
