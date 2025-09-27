import { Injectable } from "@angular/core";
import { ExportedPublication } from "../model/exported-publication.model";
import { ExportedPublicationsListService } from "./exported-publications-list.service";
import { Publication } from "../model/publication.model";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { UserInfo } from "../model/user-info.model";
import { tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PublicationService  {
  publicationsChanged = new Subject<Publication[]>();
  userInfoChanged = new Subject<UserInfo>();
  private publications: Publication[] = [];
  private userInfo!: UserInfo;

  constructor(private exportedPublicationsListService: ExportedPublicationsListService,
              private httpClient: HttpClient) {
  }

  setPublications(publications: Publication[]) {
    this.publications = publications;
    this.publications.forEach((publication: Publication) => {
      if (publication.publication_type === "journal-article") {
        publication.imagePath = "https://thumbs.dreamstime.com/b/article-journal-vector-icon-which-can-easily-modify-204789142.jpg"
      } else if (publication.publication_type === "proceedings-article") {
        publication.imagePath = "https://png.pngtree.com/png-vector/20190806/ourlarge/pngtree-business-document-file-paper-presentation-flat-color-icon-ve-png-image_1652047.jpg";
      } else if (publication.publication_type === "book-chapter") {
        publication.imagePath = "https://t3.ftcdn.net/jpg/02/56/50/42/360_F_256504215_cSxZuoWaIQ1OyIdjHVATz2BqBIPoIrnl.jpg";
      } else if (publication.publication_type === "book") {
        publication.imagePath = "https://st2.depositphotos.com/3102403/7923/v/950/depositphotos_79232506-stock-illustration-flat-books-with-bookmarks-circle.jpg";
      } else if (publication.publication_type === "peer-review") {
        publication.imagePath = "https://media.istockphoto.com/vectors/peer-to-peer-related-vector-icon-vector-id986040438?k=20&m=986040438&s=612x612&w=0&h=Wu91mUmdeHeNwKMWQRoiXL5IzOlg7q0yY9JlFdJxrHE=";
      }
    })
    this.publicationsChanged.next(this.publications);
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    this.userInfoChanged.next(this.userInfo);
  }

  fetchPublicationsFromServer() {
    return this.httpClient.get<Publication[]>('http://localhost:8080/exportCV/getPublications')
    .pipe(
      tap(publications => {
        if (this.publications.length === 0) {
          this.setPublications(publications);
        }
    }));
  }

  savePublications() {
    this.httpClient.put('http://localhost:8080/exportCV/savePublications', this.publications).subscribe();
  }

  fetchUserInfo() {
    return this.httpClient.get<UserInfo>('http://localhost:8080/exportCV/getUserInfo')
    .pipe(
      tap(userInfo => {
        this.setUserInfo(userInfo);
    }));
  }

  getUserInfo() {
    return this.userInfo;
  }

  getPublications() {
    return this.publications;
  }

  getPublication(index: number) {
    return this.publications[index];
  }

  addExportedPublicationToList(exportedPublication: ExportedPublication) {
    if (this.validateAddDelete(exportedPublication.id)) {
      this.setExported(exportedPublication.id);
      this.exportedPublicationsListService.addExportedPublications(exportedPublication);
      this.publicationsChanged.next(this.publications);
    }
  }

  deleteFromExportedPublicationsList(id: string) {
    if (!this.validateAddDelete(id)) {
      this.setNotExported(id);
      this.exportedPublicationsListService.deleteExportedPublication(id);
      this.publicationsChanged.next(this.publications);
    }
  }

  setNotExported(id : string) {
    const index = this.publications.findIndex((publication) => publication.id === id);
    this.publications[index].isExported = false;
    this.publicationsChanged.next(this.publications);
  }

  validateAddDelete(id: string): boolean {
    const index = this.publications.findIndex((publication) => publication.id == id);
    return !this.publications[index].isExported;
  }

  setExported(id : string) {
    const index = this.publications.findIndex((publication) => publication.id == id);
    this.publications[index].isExported = true;
    this.publicationsChanged.next(this.publications);
  }

  countPublicationsByType(type: string): number {
    const journals = this.publications.filter(publication => publication.publication_type === type);
    return journals.length;
  }

  getYears(): string[] {
    let years: string[] = [];
    this.publications.forEach(publication => {
      if (publication.publication_date != null) {
        const year = publication.publication_date.substring(0,4);
        if (!years.includes(year)) {
          years.push(year);
        }
      }
    });
    return years.sort();
  }

  countPublicationsByTypePerYear(type: string): number[] {
    let allYears: number[] = [];
    const years = this.getYears();

    years.forEach(year => {
      let count: number = 0;
      this.publications.forEach(publication => {
        if (publication.publication_date != null &&
          publication.publication_date.substring(0,4) === year &&
          publication.publication_type === type)
        {
          count += 1;
        }
      });
      allYears.push(count);
    });

    return allYears;
  }
}
