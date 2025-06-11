import { Component, OnInit } from '@angular/core'
import { AdminCommService } from '../admin-comm.service'
import { MatDialog } from '@angular/material/dialog'
import { NewPostComponent } from './new-post/edit-post.component'
import { catchError, throwError } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { News } from 'src/app/types/news'
import { marked } from 'marked'

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss'],
  standalone: false,
})
export class NewsEditComponent implements OnInit {
  news: Array<News & { formatted: string }> = new Array<
    News & { formatted: string }
  >()
  loading = true

  constructor(
    private ac: AdminCommService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = true
    this.ac.news.getNews().subscribe(data => {
      this.loading = false
      this.news = data.map(v => {
        var nd: News & { formatted: string } = {
          ...v,
          formatted: marked.parse(v.content, { breaks: true }).toString(),
        }
        return nd
      })
    })
  }

  newPost() {
    this.dialog
      .open(NewPostComponent, { width: '90vw' })
      .afterClosed()
      .subscribe(result => {
        if (result == undefined) return
        this.ac.news
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

  editPost(item: any) {
    this.dialog
      .open(NewPostComponent, { data: item, width: '90vh' })
      .afterClosed()
      .subscribe(result => {
        if (result == undefined) return
        this.ac.news
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
    this.ac.news.deleteNews(id).subscribe(data => {
      if (data.status == 200) {
        this.ngOnInit()
      }
    })
  }

  visibleToggle(item: any) {
    this.ac.news
      .toggleNews(item._id, item.visible)
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

  pinToggle(item: any) {
    console.log(item.pinned)
    this.ac.news
      .togglePin(item._id, item.pinned)
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
}
