import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Publication } from "../model/publication.model";
import { PublicationService } from "../service/publication.service";

@Injectable({providedIn: 'root'})
export class PublicationsResolverService implements Resolve<Publication[]> {
  constructor(private publicationService: PublicationService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.publicationService.getPublications().length === 0) {
      return this.publicationService.fetchPublicationsFromServer();
    } else {
      return this.publicationService.getPublications();
    }
  }
}
