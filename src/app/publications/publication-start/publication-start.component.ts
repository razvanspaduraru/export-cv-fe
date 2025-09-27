import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/model/user-info.model';
import { PublicationService } from '../../shared/service/publication.service';

@Component({
  selector: 'app-publication-start',
  templateUrl: './publication-start.component.html',
  styleUrls: ['./publication-start.component.css']
})
export class PublicationStartComponent implements OnInit {
  userInfo!: UserInfo;

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.publicationService.fetchUserInfo().subscribe();
    this.userInfo = this.publicationService.getUserInfo();
    this.publicationService.userInfoChanged.subscribe(userInfo => {
      this.userInfo = userInfo;
    })
  }
}
