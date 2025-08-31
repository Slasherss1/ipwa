import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { firstValueFrom } from 'rxjs';
import { CleanNote } from 'src/app/types/clean-note';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CleanService {
  private http = inject(HttpClient)

  private _dailyClean = signal<number | undefined>(undefined)
  readonly dailyClean = this._dailyClean.asReadonly()

  constructor() {
    this.getClean(DateTime.now()).then(v => {
      this._dailyClean.set(v?.grade)
    })
  }

  async getClean(date: DateTime) {
    return await firstValueFrom(
      this.http.get<{ grade: number; notes: CleanNote[]; tips: string } | undefined>(
        environment.apiEndpoint + `/app/clean/${date.toISODate()}`,
        { withCredentials: true }
      )
    )
  }
}
