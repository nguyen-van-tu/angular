import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserListDTO } from "src/app/main/dto/User/UserListDTO";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";
import { HelperRegex } from "src/app/main/common/helper-regex";
import { HelperService } from "src/app/main/common/helper.service";
import { Notification } from "src/app/main/common/Notification";
import { UserUpdateDTO } from "src/app/main/dto/User/UserUpdateDTO";
import { UserNewDTO } from "src/app/main/dto/User/UserNewDTO";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import * as dayjs from "dayjs";
import icMail from "@iconify/icons-ic/twotone-mail";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/main/common/format-datepicker";
import { FuncHelper } from "src/app/main/common/funcHelper";

@Component({
  selector: "vex-user-create-update",
  templateUrl: "./user-create-update.component.html",
  styleUrls: ["./user-create-update.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class UserCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icMail = icMail;
  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  myDate: Date;
  genders = [
    { value: 1, viewValue: "Male" },
    { value: 2, viewValue: "Female" },
  ];

  checkUsername: boolean;
  checkEmail: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.myDate = new Date();
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as UserListDTO;
    }
    if (this.mode === "update") {
      this.form = this.fb.group({
        userName: [this.defaults.userName || ""],
        idString: [this.defaults.idString || ""],
        firstName: [
          this.defaults.firstName || "",
          Validators.pattern(HelperRegex.REG_NAME),
        ],
        midName: [
          this.defaults.midName || "",
          Validators.pattern(HelperRegex.REG_MID_NAME),
        ],
        lastName: [
          this.defaults.lastName || "",
          Validators.pattern(HelperRegex.REG_NAME),
        ],
        email: [
          this.defaults.email || "",
          Validators.pattern(HelperRegex.REG_EMAIL),
        ],
        gender: [this.defaults.gender, Validators.required],
        address: [
          this.defaults.address || "",
          Validators.pattern(HelperRegex.REG_ADDRESS),
        ],
        displayName: [
          this.defaults.displayName || "",
          Validators.pattern(HelperRegex.REG_NAME),
        ],
        dateOfBirth: [this.defaults.dateOfBirth || "", Validators.required],
        phone: [
          this.defaults.phone || "",
          Validators.pattern(HelperRegex.REG_PHONE),
        ],
      });
    } else {
      this.form = this.fb.group({
        username: [
          this.defaults.username || "",
          [Validators.required, Validators.pattern(HelperRegex.REG_USERNAME)],
        ],
        password: [this.defaults.password || "", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
        fullName: [
          this.defaults.fullName || "",
          Validators.pattern(HelperRegex.REG_NAME),
        ],
        currentAddress: [
          this.defaults.currentAddress || "",
          Validators.pattern(HelperRegex.REG_ADDRESS),
        ],
      });
    }
  }

  // Set Disable Date In alender
  public dateFilter = (date: Date) => date <= this.myDate;

  public save(): void {
    if (this.mode === "create") {
      this.createUser();
    } else if (this.mode === "update") {
      this.updateUser();
    }
  }

  private createUser(): void {
    if (!this.form.invalid) {
      const user: UserNewDTO = new UserNewDTO(this.form.value);
      this.dialogRef.close(user);
    } else {
      Notification.showErrorMessage("Form Invalid", "Please check again");
    }
  }

  private updateUser(): void {
    if (!this.form.invalid) {
      const user: UserUpdateDTO = new UserUpdateDTO(this.form.value);
      user.idString = this.defaults.idString;
      if (!FuncHelper.validate(user.dateOfBirth, "YYYY/MM/DD")) {
        user.dateOfBirth = dayjs(user.dateOfBirth, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
      }
      user.dateOfBirth = (
        new Date(user.dateOfBirth).getTime() / 1000
      ).toString();
      this.dialogRef.close(user);
    } else {
      Notification.showErrorMessage("Form Invalid", "Please check again");
    }
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  
  public checkExistsUsername(): void {
    this.checkUsername = false;
    if (!this.form.get("username").invalid) {
      this.helperService
        .checkExists(this.form.get("username").value, "users/checkUsername")
        .then((data: any) => {
          if (data) {
            this.form.get("username").setErrors({ incorrect: true });
          } else {
            this.form.get("username").setErrors(null);
          }
          this.checkUsername = data;
        })
        .catch((error) => {
          Notification.showErrorStatus(error);
        });
    }
  }

  public checkEmailExists(): void {
    this.checkEmail = false;
    if (!this.form.get("email").invalid) {
      this.helperService
        .checkExists(this.form.get("email").value, "users/checkEmail")
        .then((data: any) => {
          if (data) {
            this.form.get("email").setErrors({ incorrect: true });
          } else {
            this.form.get("email").setErrors(null);
          }
          this.checkEmail = data;
        })
        .catch((error) => {
          Notification.showErrorStatus(error);
        });
    }
  }
}
