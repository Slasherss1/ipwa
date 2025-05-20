import { ApplicationRef, Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { catchError, concat, first, from, interval, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService implements OnInit {

  constructor(readonly appRef: ApplicationRef, readonly update: SwUpdate, readonly sb: MatSnackBar) {
    this.update.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current: ${evt.currentVersion.hash}, new: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.error(`Failed to install ${evt.version.hash}: ${evt.error}`);
          break;    
      }
    })
  }
  
  ngOnInit(): void {
    const appIsStable = this.appRef.isStable.pipe(first(isStable => isStable === true))
    const everyday = interval(1000 * 60 * 60 * 24)
    const stableDay = concat(appIsStable, everyday)
  
    stableDay.subscribe(this.checkForUpdate)
  }
  
  checkForUpdate() {
    let ov = from(this.update.checkForUpdate())
    return ov.pipe(catchError((err) => {
      console.error('Failed to check for updates:', err);
      return throwError(() => err)
    })).pipe(tap((val)=>{
      if (val) this.promptUser()
    }))
  }

  promptUser() {
    this.sb.open("Dostępna jest aktualizacja", "Restart").onAction().subscribe(() => {
      document.location.reload()
    })
  }
}
