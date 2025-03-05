import { Component } from '@angular/core';
import { AuthClient } from '../../services/auth.client';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { environment } from 'src/environments/environment';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { AppUpdateService } from 'src/app/services/app-update.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { KeyComponent } from './key/key.component';
import { CleanComponent } from './clean/clean.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {
  updateaval: boolean | unknown = false
  checking: boolean | "err" | "aval" = false
  constructor (private ac: AuthClient, private router: Router, private dialog: MatDialog, readonly update: AppUpdateService, protected ls: LocalStorageService) {}
  public version: any = environment.version;
  protected logout() {
    let dialogRef = this.dialog.open(LogoutConfirmationComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ac.logout().subscribe(() => {
            this.router.navigateByUrl("/login")
            this.ls.logOut()
        })
      }
    })
  }

  protected openPassChange() {
    this.dialog.open(ChangePasswordDialogComponent)
  }

  protected openKey() {
    this.dialog.open(KeyComponent)
  }

  protected openClean() {
    this.dialog.open(CleanComponent)
  }

  protected goToAdmin() {
    this.router.navigateByUrl("admin")
  }

  protected async checkUpdate() {
    this.checking = true
    this.update.checkForUpdate().subscribe({
      next: (v) => {
        this.checking = false
        if (v) {
          this.checking = "aval"
        }
      },
      error: () => this.checking = "err"
    })
    this.ac.check()
  }
}
