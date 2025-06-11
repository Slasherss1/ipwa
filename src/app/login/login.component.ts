import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthClient } from '../services/auth.client'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'
import { LocalStorageService } from '../services/local-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  protected error: string | null = null
  form: FormGroup
  constructor(
    private ac: AuthClient,
    private fb: FormBuilder,
    private router: Router,
    private ls: LocalStorageService
  ) {
    this.form = this.fb.group({
      uname: [''],
      pass: [''],
    })
  }

  ngOnInit() {
    if (this.ls.loggedIn) {
      this.router.navigateByUrl(this.ac.redirect || 'app')
    }
  }

  submit() {
    const val = this.form.value
    this.ac
      .login(val.uname, val.pass)
      .pipe(
        catchError((err, caught) => {
          this.error = err.error.message
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(data => {
        this.ls.loggedIn = true
        this.router.navigateByUrl(this.ac.redirect || 'app')
        if (data.admin) {
          this.ls.admin = data.admin
        }
      })
  }
}
