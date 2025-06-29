import { Component, inject } from '@angular/core'
import { AuthClient } from '../../services/auth.client'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component'
import { environment } from 'src/environments/environment'
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component'
import { AppUpdateService } from 'src/app/services/app-update.service'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { KeyComponent } from './key/key.component'
import { CleanComponent } from './clean/clean.component'
import { AboutComponent } from './about/about.component'
import { ExtraComponent } from './extra/extra.component'
import { CleanService } from './clean/clean.service'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  standalone: false,
})
export class PersonalComponent {
  private ac = inject(AuthClient)
  private router = inject(Router)
  private dialog = inject(MatDialog)
  private update = inject(AppUpdateService)
  protected clean = inject(CleanService)
  protected ls = inject(LocalStorageService)

  updateaval: boolean | unknown = false
  checking: boolean | 'err' | 'aval' = false
  public version = environment.version
  protected logout() {
    this.dialog.open(LogoutConfirmationComponent)
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
    this.router.navigateByUrl('admin')
  }

  protected async checkUpdate() {
    this.checking = true
    this.update.checkForUpdate().subscribe({
      next: v => {
        this.checking = false
        if (v) {
          this.checking = 'aval'
        }
      },
      error: () => (this.checking = 'err'),
    })
    this.ac.check()
  }

  protected openExtra() {
    this.dialog.open(ExtraComponent)
  }

  protected openAbout() {
    this.dialog.open(AboutComponent)
  }
}
