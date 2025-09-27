import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publication } from '../../shared/model/publication.model';
import { PublicationService } from '../../shared/service/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit, OnDestroy {

  publications: Publication[] = [];
  private idChangeSub!: Subscription;

  constructor(private publicationService: PublicationService) { }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.publicationService.fetchPublicationsFromServer().subscribe();
    this.publications = this.publicationService.getPublications();
    this.idChangeSub = this.publicationService.publicationsChanged.subscribe((publications: Publication[]) => {
      this.publications = publications;
    });
  }
}
