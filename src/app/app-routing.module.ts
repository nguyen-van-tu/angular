import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { AuthGuard } from "./main/auth/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./main/login/login.module").then((m) => m.LoginModule),
  },

  {
    path: "",
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboards/analytics",
        redirectTo: "/",
      },

      {
        path: "",
        loadChildren: () =>
          import(
            "./main/apps/dashboard-analytics/dashboard-analytics.module"
          ).then((m) => m.DashboardAnalyticsModule),
      },

      {
        path: "apps/management",
        children: [
          {
            path: "users",
            loadChildren: () =>
              import("./main/apps/users/users.module").then(
                (m) => m.UsersModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  providers: [[AuthGuard]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
