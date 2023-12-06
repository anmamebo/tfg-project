import { Pipe, PipeTransform } from '@angular/core';

import { STATUS_TREATMENT_OPTIONS } from 'src/app/core/constants/options/status-treatment-options.constants';

@Pipe({
  name: 'statusTreatment',
})
export class StatusTreatmentPipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    const statusOption = STATUS_TREATMENT_OPTIONS.find(
      (option) => option.value === status
    );

    return statusOption ? statusOption.text : 'Otro';
  }
}
