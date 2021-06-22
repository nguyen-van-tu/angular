import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { aioTableLabels } from "../../../../static-data/aio-table-data";
import { UserCreateUpdateComponent } from "./user-create-update/user-create-update.component";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import { SelectionModel } from "@angular/cdk/collections";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { FormControl } from "@angular/forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import { HelperService } from "../../common/helper.service";
import { Notification } from "src/app/main/common/Notification";
import { UserListDTO } from "../../dto/User/UserListDTO";
import { Sort } from "../../common/sort";
import { FuncHelper } from "../../common/funcHelper";
import { UserUpdateDTO } from "../../dto/User/UserUpdateDTO";
import { UserNewDTO } from "../../dto/User/UserNewDTO";
import * as dayjs from "dayjs";
import { UserDeleteDTO } from "../../dto/User/UserDeleteDTO";
import Notiflix from "notiflix";
import { ChangeDetectorRef } from "@angular/core";
import { SelectionUser } from "./interfaces/SelectionUser";
@UntilDestroy()
@Component({
  selector: "vex-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class UsersComponent implements OnInit, AfterViewInit {
  layoutCtrl = new FormControl("boxed");
  subject$: ReplaySubject<UserListDTO[]> = new ReplaySubject<UserListDTO[]>(1);
  data$: Observable<UserListDTO[]> = this.subject$.asObservable();
  users: UserListDTO[];
  listSelection: SelectionUser[] = [];
  totalSelected: number = 0;
  @Input()
  columns: TableColumn<UserListDTO>[] = [
    {
      label: "Checkbox",
      property: "checkbox",
      type: "checkbox",
      visible: true,
    },
    {
      label: "User Name",
      property: "userName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Display Name",
      property: "displayName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "First Name",
      property: "firstName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Mid Name",
      property: "midName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Last Name",
      property: "lastName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Gender",
      property: "gender",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Birthday",
      property: "dateOfBirth",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Email",
      property: "email",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Address",
      property: "address",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Phone",
      property: "phone",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Status",
      property: "status",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "IsDeleted",
      property: "isDeleted",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
  ];

  pageSize: number = 5;
  pageIndex: number = 0;
  totalElements: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<UserListDTO> | null;
  selection = new SelectionModel<UserListDTO>(true, []);
  txtSearch: string = "";
  labels = aioTableLabels;
  sort: Sort[] = [{ property: "userName", direction: "asc" }];
  multiSort: string[] = ["userName", "asc"];
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  viewMode: number = 1;
  options = [
    { value: 1, viewValue: "Active" },
    { value: 2, viewValue: "Inactive" },
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private cd: ChangeDetectorRef
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.getData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter<UserListDTO[]>(Boolean)).subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  public createUser(): void {
    this.dialog
      .open(UserCreateUpdateComponent)
      .afterClosed()
      .subscribe((user: UserNewDTO) => {
        if (user) {
          this.helperService
            .add(user, "users")
            .then(() => {
              Notification.showSuccess("Added!!!", "", "OK");
              this.getData();
            })
            .catch((error) => {
              Notification.clearWaitNoMessage();
              Notification.showErrorMessage(error.error, error.error);
            });
        }
      });
  }

  public changeMode(): void {
    this.listSelection = [];
    this.totalSelected = 0;
    if (this.viewMode === 2) {
      this.getData(1);
    } else {
      this.getData();
    }
  }

  public updateCustomer(user: UserUpdateDTO): void {
    this.dialog
      .open(UserCreateUpdateComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe((updatedCustomer: UserUpdateDTO) => {
        if (updatedCustomer) {
          this.helperService
            .update(updatedCustomer, "users")
            .then(() => {
              Notification.showSuccess("Updated!!!", "", "OK");
              this.getData();
            })
            .catch((error) => {
              Notification.clearWaitNoMessage();
              Notification.showErrorMessage(error.error, error.error);
            });
        }
      });
  }

  public reactiveUsers(): void {
    const listUserReactive: UserDeleteDTO[] = [];

    if (this.listSelection.length > 0) {
      this.listSelection.forEach((elm) => {
        elm.listUserDTO.forEach((e) => {
          listUserReactive.push(new UserDeleteDTO(e));
        });
      });
      if (listUserReactive.length > 0) {
        Notiflix.Confirm.Init({
          titleColor: "#ff0000",
          messageFontSize: "15px",
        });
        Notiflix.Confirm.Show(
          "Confirm Reactive!!!",
          "Are you sure reactive user?",
          "Yes",
          "No",
          () => {
            this.helperService
              .reactive(listUserReactive, "users")
              .then(() => {
                this.pageIndex = 0;
                this.listSelection = [];
                this.totalSelected = 0;
                Notification.showSuccess("Reactived!!!", "", "OK");
                if (this.viewMode === 2) {
                  this.getData(1);
                } else {
                  this.getData();
                }
              })
              .catch((error) => {
                Notification.clearWaitNoMessage();
                Notification.showErrorMessage(error.error, error.error);
              });
          },
          () => {
            // No button callback
          }
        );
      }
    }
  }

  public deleteUsers(): void {
    const listUserDelete: UserDeleteDTO[] = [];
    if (this.listSelection.length > 0) {
      this.listSelection.forEach((elm) => {
        elm.listUserDTO.forEach((e) => {
          listUserDelete.push(new UserDeleteDTO(e));
        });
      });
      if (listUserDelete.length > 0) {
        Notiflix.Confirm.Init({
          titleColor: "#ff0000",
          messageFontSize: "15px",
        });
        Notiflix.Confirm.Show(
          "Confirm Delete!!!",
          "Are you sure delete user?",
          "Yes",
          "No",
          () => {
            this.helperService
              .delete(listUserDelete, "users")
              .then(() => {
                this.pageIndex = 0;
                this.listSelection = [];
                this.totalSelected = 0;
                Notification.showSuccess("Deleted!!!", "", "OK");
                if (this.viewMode === 2) {
                  this.getData(1);
                } else {
                  this.getData();
                }
              })
              .catch((error) => {
                Notification.clearWaitNoMessage();
                Notification.showErrorMessage(error.error, error.error);
              });
          },
          () => {
            // No button callback
          }
        );
      }
    }
  }

  // onFilterChange(value: string) {
  //   if (!this.dataSource) {
  //     return;
  //   }
  //   value = value.trim();
  //   value = value.toLowerCase();
  //   this.dataSource.filter = value;
  // }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): number {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows && numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    // eslint-disable-next-line no-unused-expressions
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.setListSelectionUser();
  }

  public actionCheckBox(event, row): void {
    // eslint-disable-next-line no-unused-expressions
    event ? this.selection.toggle(row) : null;
    this.setListSelectionUser();
  }

  private setListSelectionUser(): void {
    this.totalSelected = 0;
    const ind: number = this.listSelection.findIndex(
      (e) => e.page === this.pageIndex
    );
    if (ind !== -1) {
      this.listSelection.splice(ind, 1);
    }
    this.listSelection.push(
      new SelectionUser(this.pageIndex, this.selection.selected)
    );
    this.listSelection.forEach(e=>{
      this.totalSelected += e.listUserDTO.length;
    })
  }

  public trackByProperty<T>(index: number, column: TableColumn<T>): any {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: UserListDTO) {
    // const index = this.users.findIndex((c) => c === row);
    // this.users[index].labels = change.value;
    // this.subject$.next(this.users);
  }

  public changePage(event): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.viewMode === 2) {
      this.getData(1);
    } else {
      this.getData();
    }
  }

  private getData(isDeleted: number = 0): void {
    Notification.showWaitingBlock("table");
    this.helperService
      .getList(
        this.pageIndex,
        this.pageSize,
        this.multiSort,
        this.txtSearch,
        isDeleted,
        "users"
      )
      .then((data: any) => {
        data.content.forEach((elm) => {
          elm.dateOfBirth = dayjs(elm.dateOfBirth * 1000).toDate();
        });
        this.subject$.next(data.content);
        this.totalElements = data.totalElements;
        this.selection.clear();
        this.cd.detectChanges();
      })
      .catch((error) => {
        Notification.showErrorStatus(error);
      })
      .then(() => {
        const ind: number = this.listSelection.findIndex(
          (e) => e.page === this.pageIndex
        );
        if (ind !== -1) {
          // eslint-disable-next-line no-unused-expressions
          this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row) => {
                const index: number = this.listSelection[
                  ind
                ].listUserDTO.findIndex((elm) => elm.idString === row.idString);
                if (index !== -1) {
                  this.selection.select(row);
                }
              });
        }
        Notification.clearWaitBlockNoMessage("table");
      });
  }

  public actionSearch() {
    this.pageIndex = 0;
    this.getData();
  }

  public sortData(e): void {
    this.multiSort = [];
    FuncHelper.getArraySort(this.sort, e).forEach((element) => {
      this.multiSort.push(element.property);
      this.multiSort.push(element.direction);
    });
    this.getData();
  }
}
