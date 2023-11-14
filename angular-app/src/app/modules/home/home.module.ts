import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { HomeRoutingModule } from './home-routing.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

// Componentes
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    SidebarModule, 
    FooterModule
  ],
})
export class HomeModule {}
