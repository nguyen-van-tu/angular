import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { AuthJwtService } from "src/app/main/auth/auth-jwt.service";
import { TokenStorageService } from "src/app/main/auth/token-storage.service";
import { Notification } from "src/app/main/common/Notification";
import { AuthLoginInfo } from "src/app/main/auth/login-info";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  checkLogin: boolean = true;
  accountLoginInfo: AuthLoginInfo = new AuthLoginInfo("", "");

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private auth: AuthJwtService,
    private tokenStorage: TokenStorageService,
  ) {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [this.accountLoginInfo.username, Validators.required],
      password: [this.accountLoginInfo.password, Validators.required],
    });
  }

  public onSubmit(): void {
    Notification.showWaiting();
    this.auth
      .attemptAuth(this.accountLoginInfo)
      .then((data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.setAccountInfo(data.accountBasicInfoDTO);
        this.router.navigateByUrl("/");
      })
      .catch(() => {
        this.checkLogin = false;
        this.cd.detectChanges();
      })
      .finally(() => {
        Notification.clearWaitNoMessage();
      })
      .then(() => {
        this.checkLogin = this.tokenStorage.getAccountInfo() !== undefined && this.tokenStorage.getAccountInfo() !== null;
      });
  }

  public toggleVisibility(): void {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
