import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Group } from 'src/app/types/group';
import { Status } from 'src/app/types/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private http = inject(HttpClient)

  getGroups() {
    return this.http.get<Group[]>(environment.apiEndpoint + `/admin/groups`, {
      withCredentials: true,
    })
  }

  newGroup(name: string) {
    return this.http.post<Status>(
      environment.apiEndpoint + `/admin/groups`,
      { name: name },
      { withCredentials: true }
    )
  }

  editName(id: string, name: string) {
    return this.putGroups(id, { name: name.trim() })
  }

  remove(id: string) {
    return this.http.delete<Status>(
      environment.apiEndpoint + `/admin/groups/${id}`,
      { withCredentials: true }
    )
  }

  private putGroups(id: string, update: Partial<Group>) {
    return this.http.put<Status>(
      environment.apiEndpoint + `/admin/groups/${id}`,
      update,
      { withCredentials: true }
    )
  }
}
