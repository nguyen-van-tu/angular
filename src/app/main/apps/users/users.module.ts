import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { UserCreateUpdateModule } from "./user-create-update/user-create-update.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { IconModule } from "@visurel/iconify-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { TranslateModule } from "@ngx-translate/core";
import { UserService } from "./users.service";
import { HelperService } from "./../../common/helper.service";
import { PaginatorDirective } from "../../common/pagination.directive";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMultiSortModule } from 'ngx-mat-multi-sort';
@NgModule({
  declarations: [UsersComponent, PaginatorDirective],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    UserCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    TranslateModule,
    NgxPaginationModule,
    MatMultiSortModule
  ],
  exports: [PaginatorDirective],

  providers: [UserService, HelperService],
})
export class UsersModule {}
