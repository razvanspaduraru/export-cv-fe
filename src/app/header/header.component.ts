import { Component } from "@angular/core";
import { ExportedPublicationsListService } from "../shared/service/exported-publications-list.service";
import { PublicationService } from "../shared/service/publication.service";

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private publicationService: PublicationService, private exportedPublicationsListService: ExportedPublicationsListService) {

  }

  onSaveData() {
    this.publicationService.savePublications();
    this.exportedPublicationsListService.saveExportedPublications();
  }

  onExportCV() {
    this.publicationService.savePublications();
    this.exportedPublicationsListService.exportCV();
  }
}
