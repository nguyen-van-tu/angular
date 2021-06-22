import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { PopoverService } from "../../../components/popover/popover.service";
import { ToolbarUserDropdownComponent } from "./toolbar-user-dropdown/toolbar-user-dropdown.component";
import icPerson from "@iconify/icons-ic/twotone-person";
import { TokenStorageService } from "src/app/main/auth/token-storage.service";
import { AccountInfoDTO } from "src/app/main/dto/User/UserDTO";

@Component({
  selector: "vex-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarUserComponent implements OnInit {
  dropdownOpen: boolean;
  icPerson = icPerson;
  accountBasicInfo: AccountInfoDTO;

  constructor(
    private popover: PopoverService,
    private cd: ChangeDetectorRef,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit() {
    // set info account
    this.accountBasicInfo = this.tokenService.getAccountInfo();
  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
