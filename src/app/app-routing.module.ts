import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewsComponent } from './app-view/news/news.component'
import { MenuComponent } from './app-view/menu/menu.component'
import { AppViewComponent } from './app-view/app-view.component'
import { LoginComponent } from './login/login.component'
import { authGuard } from './auth.guard'
import { PersonalComponent } from './app-view/personal/personal.component'
import { AdminViewComponent } from './admin-view/admin-view.component'
import { NewsEditComponent } from './admin-view/news-edit/news-edit.component'
import { AccountMgmtComponent } from './admin-view/account-mgmt/account-mgmt.component'
import { MenuNewComponent } from './admin-view/menu-new/menu-new.component'
import { adminGuard } from './admin.guard'
import { GroupsComponent } from './admin-view/groups/groups.component'
import { StartComponent } from './app-view/start/start.component'
import { AdminKeyComponent } from './admin-view/key/key.component'
import { GradesComponent } from './admin-view/grades/grades.component'
import { SummaryComponent } from './admin-view/grades/summary/summary.component'
import { SettingsComponent } from './admin-view/settings/settings.component'
import { AttendenceSummaryComponent } from './admin-view/grades/attendence-summary/attendence-summary.component'
import { NotificationsComponent } from './admin-view/notifications/notifications.component'
import { OutboxComponent } from './admin-view/notifications/outbox/outbox.component'
import { StartAdminComponent } from './admin-view/start/start.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: AppViewComponent,
    title: 'Internat',
    canActivateChild: [authGuard],
    children: [
      { path: '', component: StartComponent, pathMatch: 'full' },
      { path: 'news', component: NewsComponent, title: 'Wiadomości' },
      { path: 'menu', component: MenuComponent, title: 'Jadłospis' },
      { path: 'grades', component: PersonalComponent, title: 'Konto' },
    ],
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    title: 'Panel administracyjny',
    canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', component: StartAdminComponent },
      {
        path: 'news',
        title: 'Edytowanie wiadomości',
        component: NewsEditComponent,
      },
      {
        path: 'menu',
        title: 'Edytowanie jadłospisu',
        component: MenuNewComponent,
      },
      {
        path: 'accounts',
        title: 'Użytkownicy',
        component: AccountMgmtComponent,
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            pathMatch: 'full',
            title: 'Powiadomienia',
            component: NotificationsComponent,
          },
          { path: 'outbox', title: 'Wysłane', component: OutboxComponent },
        ],
      },
      { path: 'groups', title: 'Grupy', component: GroupsComponent },
      { path: 'keys', title: 'Klucze', component: AdminKeyComponent },
      {
        path: 'grades',
        children: [
          {
            path: '',
            pathMatch: 'full',
            title: 'Oceny',
            component: GradesComponent,
          },
          {
            path: 'summary',
            title: 'Podsumowanie ocen',
            component: SummaryComponent,
          },
          {
            path: 'attendenceSummary',
            title: 'Obecność',
            component: AttendenceSummaryComponent,
          },
        ],
      },
      { path: 'settings', title: 'Ustawienia', component: SettingsComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
