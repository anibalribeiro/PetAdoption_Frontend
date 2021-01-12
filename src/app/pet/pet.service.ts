import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pet } from './models/pet.model';
import { PetPostDto } from './models/petPostDto.model';
import { environment } from '../../environments/environment';
import { PageResponse } from '../shared/models/pageResponse.model';
import { GlobalErrorHandler } from '../core/services/globar-error.handler';
import { NotificationService } from '../core/services/notification.service';

const baseUrl = `${environment.apiUrl}/pets`;

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) {
  }

  getAll(): Observable<PageResponse<Pet>> {
    return this.httpClient.get<PageResponse<Pet>>(baseUrl);
  }

  get(id: number): Observable<Pet> {
    return this.httpClient.get<Pet>(`${baseUrl}/${id}`).pipe(
      catchError(error => {
        this.notificationService.snackbarError(GlobalErrorHandler.displayPrettyErrorMessage(error));
        throw error;
      })
    );
  }

  create(data: PetPostDto): Observable<Pet> {
    return this.httpClient.post<Pet>(baseUrl, data);
  }

  update(id: number, data: Pet): Observable<Pet> {
    return this.httpClient.put<Pet>(`${baseUrl}/${id}`, data);
  }
}
