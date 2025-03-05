import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminCommService } from '../admin-comm.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { catchError, throwError } from 'rxjs';
import { UserResetComponent } from './user-reset/user-reset.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-account-mgmt',
  templateUrl: './account-mgmt.component.html',
  styleUrls: ['./account-mgmt.component.scss']
})


export class AccountMgmtComponent implements OnInit, AfterViewInit {
  users: MatTableDataSource<any>
  loading = false
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(readonly ac:AdminCommService, private dialog: MatDialog, private sb: MatSnackBar, protected readonly ls: LocalStorageService) {
    this.users = new MatTableDataSource<any>();
    this.users.filterPredicate = (data: Record<string, any>, filter: string): boolean => {
      const dataStr = Object.keys(data).reduce((curr: string, key: string) => {
        if (key == "_id") {
          return ''
        }
        return curr + data[key] + '⫂'
      }, '').toLowerCase()
      const filternew = filter.trim().toLowerCase()

      return dataStr.indexOf(filternew) != -1
    }
  }
  
  ngAfterViewInit() {
    this.users.paginator = this.paginator
  }

  ngOnInit() {
    this.loading = true
    this.ac.accs.getAccs().subscribe((data)=>{
      this.loading = false
      this.users.data = data
    })
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.users.filter = value.toLowerCase().trim()
  }

  edit(item: any) {
    this.dialog.open(UserEditComponent, {data: item}).afterClosed().subscribe(reply => {
      if (reply) {
        this.ac.accs.putAcc(item._id, reply).pipe(catchError((err)=>{
          this.sb.open("Wystąpił błąd. Skontaktuj się z obsługą programu.")
          return throwError(()=> new Error(err.message))
        })).subscribe((data)=> {
          if (data.status == 200) {
            this.sb.open("Użytkownik został zmodyfikowany.", undefined, {duration: 2500})
            this.ngOnInit()
          } else {
            this.sb.open("Wystąpił błąd. Skontaktuj się z obsługą programu.")
          }
        })
      }
    })
  }

  new() {
    this.dialog.open(UserEditComponent).afterClosed().subscribe(reply => {
      if (reply) {
        this.ac.accs.postAcc(reply).pipe(catchError((err)=>{
          this.sb.open("Wystąpił błąd. Skontaktuj się z obsługą programu.")
          return throwError(()=> new Error(err.message))
        })).subscribe((data)=> {
          if (data.status == 201) {
            this.sb.open("Użytkownik został utworzony.", undefined, {duration: 2500})
            this.ngOnInit()
          } else {
            this.sb.open("Wystąpił błąd. Skontaktuj się z obsługą programu.")
          }
        })
      }
    })
  }

  delete(id: string) {
    this.dialog.open(UserDeleteComponent).afterClosed().subscribe(reply => {
      if (reply) {
        this.ac.accs.deleteAcc(id).subscribe((res) => {
          if (res.status == 200) {
            this.sb.open("Użytkownik został usunięty.", undefined, {duration: 2500})
            this.ngOnInit()
          } else {
            this.sb.open("Wystąpił błąd. Skontaktuj się z obsługą programu.")
            console.error(res);
          }
        })
      }
    })
  }

  resetPass(id: string) {
    this.dialog.open(UserResetComponent).afterClosed().subscribe((res) => {
      if (res == true) {
        this.ac.accs.resetPass(id).subscribe((patch)=>{
          if (patch.status == 200) {
            this.sb.open("Hasło zostało zresetowane", undefined, {duration: 2500})
          }
        })
      }
    })
  }

  toggleLock(item: any) {
    this.ac.accs.putAcc(item._id, {locked: !item.locked}).subscribe((res) => {
      if (res.status == 200) {
        item.locked = !item.locked
      }
    })
  }

  collumns = ['name', 'surname', 'uname', 'actions']
}
