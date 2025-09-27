import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicationDetailComponent } from "./publications/publication-detail/publication-detail.component";
import { PublicationStartComponent } from "./publications/publication-start/publication-start.component";
import { PublicationsComponent } from "./publications/publications.component";
import { ExportedPublicationsListComponent } from "./exported-publications-list/exported-publications-list.component";
import { PublicationsResolverService } from "./shared/resolver/publications-resolver.service";
import { UserInfoResolverService } from "./shared/resolver/user-info-resolver.service";
import { ExportedPublicationsResolverService } from "./shared/resolver/exported-publications-resolver.service";
import { StatisticsComponent } from "./statistics/statistics.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/publications', pathMatch: 'full' },
  { path: 'publications', component: PublicationsComponent, children: [
    { path: '', component: PublicationStartComponent, resolve: [UserInfoResolverService]},
    { path: ':id', component: PublicationDetailComponent}
  ], resolve: [PublicationsResolverService]},
 { path: 'exported-publications-list', component: ExportedPublicationsListComponent, resolve: [ExportedPublicationsResolverService] },
 { path: 'statistics', component: StatisticsComponent}
];

@NgModule( {
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
