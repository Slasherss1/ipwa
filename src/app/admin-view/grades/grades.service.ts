import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  private http = inject(HttpClient)

  getConfig() {
    return this.http.get<{ rooms: string[]; things: string[] }>(
      environment.apiEndpoint + `/admin/clean/config`,
      { withCredentials: true }
    )
  }

  getClean(date: DateTime, room: string) {
    return this.http.get<{
      _id: string
      date: string
      grade: number
      gradeDate: string
      notes: { label: string; weight: number }[]
      room: string
      tips: string
    } | null>(environment.apiEndpoint + `/admin/clean/${date.toISODate()}/${room}`, {
      withCredentials: true,
    })
  }

  postClean(obj: object) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/admin/clean/`,
      obj,
      { withCredentials: true }
    )
  }

  delete(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/clean/${id}`,
      { withCredentials: true }
    )
  }

  summary = {
    getSummary: (start: DateTime, end: DateTime) => {
      return this.http.get<{ room: string; avg: number }[]>(
        environment.apiEndpoint +
        `/admin/clean/summary/${start.toISO()}/${end.toISO()}`,
        { withCredentials: true }
      )
    },
  }

  attendence = {
    getUsers: (room: string) => {
      return this.http.get<{
        users: { fname: string; surname: string; _id: string }[]
        attendence?: { auto: { id: string; hour?: string }[]; notes: string }
      }>(environment.apiEndpoint + `/admin/clean/attendence/${room}`, {
        withCredentials: true,
      })
    },
    postAttendence: (
      room: string,
      attendence: { auto: { id: string; hour?: string }[]; notes: string }
    ) => {
      return this.http.post<Status>(
        environment.apiEndpoint + `/admin/clean/attendence/${room}`,
        attendence,
        { withCredentials: true }
      )
    },
    getSummary: () => {
      return this.http.get<
        { room: string; hours: string[]; notes: string; auto: boolean }[]
      >(environment.apiEndpoint + `/admin/clean/attendenceSummary`, {
        withCredentials: true,
      })
    },
    deleteRoom: (room: string) => {
      return this.http.delete<Status>(
        environment.apiEndpoint + `/admin/clean/attendence/${room}`,
        { withCredentials: true }
      )
    },
  }
}
