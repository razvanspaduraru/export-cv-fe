import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExportedPublication } from 'src/app/shared/model/exported-publication.model';
import { Publication } from '../../shared/model/publication.model';
import { PublicationService } from '../../shared/service/publication.service';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent implements OnInit {
  publication!: Publication;
  id!: number;
  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.publication = this.publicationService.getPublication(this.id);
    });
  }

  onAddToExportedPublicationsList() {
    this.publicationService.addExportedPublicationToList(new ExportedPublication(this.publication.id, this.publication.title, this.publication.abstract_text, this.publication.publication_type));
  }

  onDeleteFromExportedPublicationsList() {
    this.publicationService.deleteFromExportedPublicationsList(this.publication.id);
  }
}
