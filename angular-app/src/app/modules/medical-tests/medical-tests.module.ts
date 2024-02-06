import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Módulos
import { ElementsPerPageModule } from 'src/app/shared/components/elements-per-page/elements-per-page.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalTestsRoutingModule } from './medical-tests-routing.module';

// Componentes páginas
import { MedicalTestsPageComponent } from './pages/medical-tests-page/medical-tests-page.component';
import { MedicalTestsViewPageComponent } from './pages/medical-tests-view-page/medical-tests-view-page.component';

// Componentes tarjetas
import { FiltersMedicalTestsCardComponent } from './components/filters-medical-tests-card/filters-medical-tests-card.component';
import { ListMedicalTestsCardComponent } from './components/list-medical-tests-card/list-medical-tests-card.component';
import { ViewAttachmentsMedicalTestsCardComponent } from './components/view-attachments-medical-tests-card/view-attachments-medical-tests-card.component';
import { ViewExtraInfoMedicalTestsCardComponent } from './components/view-extra-info-medical-tests-card/view-extra-info-medical-tests-card.component';
import { ViewInfoMedicalTestsCardComponent } from './components/view-info-medical-tests-card/view-info-medical-tests-card.component';
import { ViewMedicalTestsCardComponent } from './components/view-medical-tests-card/view-medical-tests-card.component';

// Componentes formularios
import { FormCompleteMedicalTestComponent } from './components/form-complete-medical-test/form-complete-medical-test.component';
import { FormEditMedicalTestComponent } from './components/form-edit-medical-test/form-edit-medical-test.component';
import { FormUploadAttachmentMedicalTestsComponent } from './components/form-upload-attachment-medical-tests/form-upload-attachment-medical-tests.component';

@NgModule({
  declarations: [
    MedicalTestsViewPageComponent,
    ViewInfoMedicalTestsCardComponent,
    ViewAttachmentsMedicalTestsCardComponent,
    ViewExtraInfoMedicalTestsCardComponent,
    FormUploadAttachmentMedicalTestsComponent,
    FormCompleteMedicalTestComponent,
    FormEditMedicalTestComponent,
    MedicalTestsPageComponent,
    ListMedicalTestsCardComponent,
    ViewMedicalTestsCardComponent,
    FiltersMedicalTestsCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MedicalTestsRoutingModule,
    SharedModule,
    GenericPageModule,
    GenericCardModule,
    TooltipModule,
    SweetAlert2Module,
    FormErrorsModule,
    LoadingSpinnerModule,
    ElementsPerPageModule,
    PaginationModule,
    FlatpickrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [ListMedicalTestsCardComponent],
})
export class MedicalTestsModule {}
