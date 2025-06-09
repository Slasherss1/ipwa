import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AppRoutingModule } from './app-routing.module';
import { AppViewComponent } from './app-view/app-view.component';
import { DateSelectorComponent } from './commonComponents/date-selector/date-selector.component';
import { MenuComponent } from './app-view/menu/menu.component';
import { NewsComponent } from './app-view/news/news.component';
import { ChangePasswordDialogComponent } from './app-view/personal/change-password-dialog/change-password-dialog.component';
import { LogoutConfirmationComponent } from './app-view/personal/logout-confirmation/logout-confirmation.component';
import { PersonalComponent } from './app-view/personal/personal.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuUploadComponent } from './admin-view/menu-new/menu-upload/menu-upload.component';
import { NewsEditComponent } from './admin-view/news-edit/news-edit.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NewPostComponent } from './admin-view/news-edit/new-post/edit-post.component';
import { AccountMgmtComponent } from './admin-view/account-mgmt/account-mgmt.component';
import { MatTableModule } from "@angular/material/table";
import { UserEditComponent } from './admin-view/account-mgmt/user-edit/user-edit.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { UserDeleteComponent } from './admin-view/account-mgmt/user-delete/user-delete.component';
import { MatSelectModule } from '@angular/material/select';
import { MenuNewComponent } from './admin-view/menu-new/menu-new.component';
import { FDSelection } from './fd.da';
import { CeDirective } from './ce.directive';
import { AllergensComponent } from './app-view/menu/allergens/allergens.component';
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { UserResetComponent } from './admin-view/account-mgmt/user-reset/user-reset.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NotificationsComponent } from './admin-view/notifications/notifications.component';
import { GroupsComponent } from './admin-view/groups/groups.component';
import { ListEditorComponent } from './commonComponents/list-editor/list-editor.component';
import { RemoveConfirmComponent } from './admin-view/groups/remove-confirm/remove-confirm.component';
import { StartComponent } from './app-view/start/start.component';
import { KeyComponent } from './app-view/personal/key/key.component';
import { AdminKeyComponent } from './admin-view/key/key.component';
import { MatChipsModule } from '@angular/material/chips'
import { NewKeyComponent } from './admin-view/key/new-key/new-key.component';
import { GradesComponent } from './admin-view/grades/grades.component';
import { RoomChooserComponent } from './commonComponents/room-chooser/room-chooser.component';
import { CleanComponent } from './app-view/personal/clean/clean.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { LabelDirective } from './label.directive';
import { MatMenuModule } from '@angular/material/menu'
import { SummaryComponent } from './admin-view/grades/summary/summary.component';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SettingsComponent } from './admin-view/settings/settings.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatBadgeModule } from "@angular/material/badge";
import { MenuAddComponent } from './admin-view/menu-new/menu-add/menu-add.component';
import { FieldEditorComponent } from './commonComponents/field-editor/field-editor.component';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AttendenceComponent } from './admin-view/grades/attendence/attendence.component';
import { AttendenceSummaryComponent } from './admin-view/grades/attendence-summary/attendence-summary.component';
import { HourDisplayComponent } from './admin-view/grades/attendence-summary/hour-display/hour-display.component';
import { AboutComponent } from './app-view/personal/about/about.component';
import { environment } from 'src/environments/environment';
import { ExtraComponent } from './app-view/personal/extra/extra.component';
import { RedirectComponent } from './app-view/personal/extra/redirect/redirect.component';
import { OutboxComponent } from './admin-view/notifications/outbox/outbox.component';
import { ToolbarComponent } from './admin-view/toolbar/toolbar.component';
import { MessageComponent } from './admin-view/notifications/outbox/message/message.component';
import { NotifDialogComponent } from './app-view/notif-dialog/notif-dialog.component';
import { UserSearchComponent } from './commonComponents/user-search/user-search.component';
import { StartAdminComponent } from './admin-view/start/start.component';
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";

@NgModule({ declarations: [
        AppComponent,
        NewsComponent,
        MenuComponent,
        LoginComponent,
        AppViewComponent,
        PersonalComponent,
        ChangePasswordDialogComponent,
        LogoutConfirmationComponent,
        DateSelectorComponent,
        AdminViewComponent,
        MenuUploadComponent,
        NewsEditComponent,
        NewPostComponent,
        AccountMgmtComponent,
        UserEditComponent,
        UserDeleteComponent,
        MenuNewComponent,
        CeDirective,
        LabelDirective,
        AllergensComponent,
        UserResetComponent,
        NotificationsComponent,
        GroupsComponent,
        ListEditorComponent,
        RemoveConfirmComponent,
        StartComponent,
        KeyComponent,
        AdminKeyComponent,
        NewKeyComponent,
        GradesComponent,
        RoomChooserComponent,
        CleanComponent,
        SummaryComponent,
        SettingsComponent,
        MenuAddComponent,
        FieldEditorComponent,
        AttendenceComponent,
        AttendenceSummaryComponent,
        HourDisplayComponent,
        AboutComponent,
        ExtraComponent,
        RedirectComponent,
        OutboxComponent,
        ToolbarComponent,
        MessageComponent,
        NotifDialogComponent,
        UserSearchComponent,
        StartAdminComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatChipsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatSortModule,
        MatButtonToggleModule,
        MatExpansionModule,
        DragDropModule,
        MatBadgeModule,
        PortalModule,
        A11yModule,
        MatAutocompleteModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [
        provideLuxonDateAdapter(),
        FDSelection,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
