import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserInfo } from "../model/user-info.model";
import { PublicationService } from "../service/publication.service";

@Injectable({providedIn: 'root'})
export class UserInfoResolverService implements Resolve<UserInfo> {
  constructor(private publicationService: PublicationService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.publicationService.getUserInfo() == null) {
      return this.publicationService.fetchUserInfo();
    } else {
      return this.publicationService.getUserInfo();
    }
  }
}
