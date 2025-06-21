import { Component, inject, OnInit } from '@angular/core'
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

  private ac = inject(AuthClient)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private ls = inject(LocalStorageService)

  constructor() {
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
        catchError((err) => {
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
