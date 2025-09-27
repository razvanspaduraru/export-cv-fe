import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/directive/dropdown.directive';
import { ExportedPublicationsListService } from './shared/service/exported-publications-list.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PublicationDetailComponent } from './publications/publication-detail/publication-detail.component';
import { PublicationListComponent } from './publications/publication-list/publication-list.component';
import { PublicationItemComponent } from './publications/publication-list/publication-item/publication-item.component';
import { PublicationStartComponent } from './publications/publication-start/publication-start.component';
import { ExportedPublicationsListComponent } from './exported-publications-list/exported-publications-list.component';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationService } from './shared/service/publication.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './statistics/pie-chart/pie-chart.component';
import { LineChartComponent } from './statistics/line-chart/line-chart.component';
import { BarChartComponent } from './statistics/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PublicationDetailComponent,
    PublicationListComponent,
    PublicationItemComponent,
    PublicationStartComponent,
    ExportedPublicationsListComponent,
    PublicationsComponent,
    StatisticsComponent,
    PieChartComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [ExportedPublicationsListService, PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
