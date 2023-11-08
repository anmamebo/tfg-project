import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { breadcrumbGroupEditData } from "src/app/core/constants/breadcrumb-data";

// Modelos
import { Group } from "src/app/core/models/group.model";

// Servicios
import { GroupService } from "src/app/core/services/group.service";


@Component({
  selector: 'app-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.scss'],
  providers: [GroupService]
})
export class GroupEditPageComponent implements OnInit {

  public breadcrumbData = breadcrumbGroupEditData;

  public group: Group | null = null;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      
      this.getProduct(id);
    });
  }

  getProduct(id: number) {
    this.groupService.getGroupById(id).subscribe({
      next: (group: Group) => {
        this.group = group;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
