import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExportedPublication } from '../shared/model/exported-publication.model';
import { ExportedPublicationsListService } from '../shared/service/exported-publications-list.service';


@Component({
  selector: 'app-exported-publications-list',
  templateUrl: './exported-publications-list.component.html',
  styleUrls: ['./exported-publications-list.component.css']
})
export class ExportedPublicationsListComponent implements OnInit, OnDestroy {
  exportedPublications: ExportedPublication[] = [];
  private idChangeSub!: Subscription;

  constructor(private exportedPublicationsListService : ExportedPublicationsListService) { }

  ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.exportedPublicationsListService.fetchExportedPublicationsFromServer().subscribe();
    this.exportedPublications = this.exportedPublicationsListService.getExportedPublications();
    this.idChangeSub = this.exportedPublicationsListService.exportedPublicationsChanged.subscribe((exportedPublications: ExportedPublication[]) => {
      this.exportedPublications = exportedPublications;
    })
  }

}
