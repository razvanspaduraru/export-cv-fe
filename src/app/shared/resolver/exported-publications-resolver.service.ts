import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ExportedPublication } from "../model/exported-publication.model";
import { ExportedPublicationsListService } from "../service/exported-publications-list.service";

@Injectable({providedIn: 'root'})
export class ExportedPublicationsResolverService implements Resolve<ExportedPublication[]> {
  constructor(private exportedPublicationService: ExportedPublicationsListService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.exportedPublicationService.fetchExportedPublicationsFromServer();
  }
}
