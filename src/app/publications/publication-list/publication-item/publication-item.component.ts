import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../../shared/model/publication.model';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.css']
})
export class PublicationItemComponent implements OnInit {
  @Input() publication!: Publication;
  @Input() index!: number

  ngOnInit(): void {
  }
}
