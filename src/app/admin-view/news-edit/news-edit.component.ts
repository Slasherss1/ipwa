import { Component, inject, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NewPostComponent } from './new-post/edit-post.component'
import { catchError, throwError } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { News } from 'src/app/types/news.model'
import { NewsEditService } from './news-edit.service'

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss'],
  standalone: false,
})
export class NewsEditComponent implements OnInit {
  protected ac = inject(NewsEditService)
  private dialog = inject(MatDialog)
  private sb = inject(MatSnackBar)

  ngOnInit() {
    this.ac.refresh()
  }

  newPost() {
    this.dialog
      .open(NewPostComponent, { width: '90vw' })
      .afterClosed()
      .subscribe(result => {
        if (result == undefined) return
        this.ac
          .postNews(result.title, result.content)
          .pipe(
            catchError(err => {
              this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
              return throwError(() => new Error(err.message))
            })
          )
          .subscribe(data => {
            if (data.status == 201) {
              this.ngOnInit()
            } else {
              this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            }
          })
      })
  }

  editPost(item: News) {
    this.dialog
      .open(NewPostComponent, { data: item, width: '90vh' })
      .afterClosed()
      .subscribe(result => {
        if (result == undefined) return
        this.ac
          .updateNews(item._id, result.title, result.content)
          .pipe(
            catchError(err => {
              this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
              return throwError(() => new Error(err.message))
            })
          )
          .subscribe(data => {
            if (data.status == 200) {
              this.ngOnInit()
            } else {
              this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            }
          })
      })
  }

  delete(id: string) {
    this.ac.deleteNews(id).subscribe(data => {
      if (data.status == 200) {
        this.ngOnInit()
      }
    })
  }

  visibleToggle(item: News) {
    this.ac
      .toggleNews(item._id, !!item.visible)
      .pipe(
        catchError(err => {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(data => {
        if (data.status == 200) {
          this.ngOnInit()
        } else {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
        }
      })
  }

  pinToggle(item: News) {
    console.log(item.pinned)
    this.ac
      .togglePin(item._id, !!item.pinned)
      .pipe(
        catchError(err => {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(data => {
        if (data.status == 200) {
          this.ngOnInit()
        } else {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
        }
      })
  }

  fullName(n: News): string {
    const { author: { fname, surname, uname } } = n;
    if (fname || surname) {
      return [fname, surname].filter(Boolean).join(' ');
    }
    return uname;
  }
}
