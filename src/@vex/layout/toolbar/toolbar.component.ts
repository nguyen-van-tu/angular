import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from "@angular/core";
import { LayoutService } from "../../services/layout.service";
import icBookmarks from "@iconify/icons-ic/twotone-bookmarks";
import emojioneUS from "@iconify/icons-emojione/flag-for-flag-united-states";
import emojioneVN from "@iconify/icons-emojione/flag-for-flag-vietnam";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { ConfigService } from "../../services/config.service";
import { map } from "rxjs/operators";
import icPersonAdd from "@iconify/icons-ic/twotone-person-add";
import icAssignmentTurnedIn from "@iconify/icons-ic/twotone-assignment-turned-in";
import icBallot from "@iconify/icons-ic/twotone-ballot";
import icDescription from "@iconify/icons-ic/twotone-description";
import icAssignment from "@iconify/icons-ic/twotone-assignment";
import icReceipt from "@iconify/icons-ic/twotone-receipt";
import icDoneAll from "@iconify/icons-ic/twotone-done-all";
import { NavigationService } from "../../services/navigation.service";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import { PopoverService } from "../../components/popover/popover.service";
import { MegaMenuComponent } from "../../components/mega-menu/mega-menu.component";
import icSearch from "@iconify/icons-ic/twotone-search";
import { TranslateService } from "@ngx-translate/core";
import * as _ from "lodash";

@Component({
  selector: "vex-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  languages: any;
  public selectedLanguage: any;
  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding("class.shadow-b")
  hasShadow: boolean;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$ = this.configService.config$.pipe(
    map((config) => config.layout === "horizontal")
  );
  isVerticalLayout$ = this.configService.config$.pipe(
    map((config) => config.layout === "vertical")
  );
  isNavbarInToolbar$ = this.configService.config$.pipe(
    map((config) => config.navbar.position === "in-toolbar")
  );
  isNavbarBelowToolbar$ = this.configService.config$.pipe(
    map((config) => config.navbar.position === "below-toolbar")
  );

  icSearch = icSearch;
  icBookmarks = icBookmarks;
  emojioneUS = emojioneUS;
  emojioneVN = emojioneVN;
  icMenu = icMenu;
  icPersonAdd = icPersonAdd;
  icAssignmentTurnedIn = icAssignmentTurnedIn;
  icBallot = icBallot;
  icDescription = icDescription;
  icAssignment = icAssignment;
  icReceipt = icReceipt;
  icDoneAll = icDoneAll;
  icArrowDropDown = icArrowDropDown;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private navigationService: NavigationService,
    private popoverService: PopoverService,
    private _translateService: TranslateService
  ) {
    this.languages = [
      {
        id: "en",
        title: "English",
        flag: "en",
      },
      {
        id: "vn",
        title: "Vietnamese",
        flag: "vn",
      },
    ];
  }

  ngOnInit() {
    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {
      id: this._translateService.currentLang,
    });
  }

  openQuickpanel() {
    this.layoutService.openQuickpanel();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement) {
    this.popoverService.open({
      content: MegaMenuComponent,
      origin,
      position: [
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });
  }

  openSearch() {
    this.layoutService.openSearch();
  }

  /**
   * Set the language
   *
   * @param lang
   */
  public setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }
}
