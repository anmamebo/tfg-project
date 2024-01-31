import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos de terceros
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Módulos
import { MedicalTestsRoutingModule } from './medical-tests-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericPageModule } from 'src/app/shared/components/generic-page/generic-page.module';
import { GenericCardModule } from 'src/app/shared/components/generic-card/generic-card.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { FormErrorsModule } from 'src/app/shared/components/form-errors/form-errors.module';

// Componentes páginas
import { MedicalTestsViewPageComponent } from './page/medical-tests-view-page/medical-tests-view-page.component';

// Componentes tarjetas
import { ViewInfoMedicalTestsCardComponent } from './components/view-info-medical-tests-card/view-info-medical-tests-card.component';
import { ViewAttachmentsMedicalTestsCardComponent } from './components/view-attachments-medical-tests-card/view-attachments-medical-tests-card.component';
import { ViewExtraInfoMedicalTestsCardComponent } from './components/view-extra-info-medical-tests-card/view-extra-info-medical-tests-card.component';
import { FormUploadAttachmentMedicalTestsComponent } from './components/form-upload-attachment-medical-tests/form-upload-attachment-medical-tests.component';

@NgModule({
  declarations: [
    MedicalTestsViewPageComponent,
    ViewInfoMedicalTestsCardComponent,
    ViewAttachmentsMedicalTestsCardComponent,
    ViewExtraInfoMedicalTestsCardComponent,
    FormUploadAttachmentMedicalTestsComponent,
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
  ],
})
export class MedicalTestsModule {}
