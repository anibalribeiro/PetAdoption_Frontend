import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PetService } from '../pet.service';
import { Pet } from '../models/pet.model';
import { Router } from '@angular/router';
import { PageResponse } from '../../shared/models/pageResponse.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  currentUser: any;
  pets: Observable<PageResponse<Pet>>;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private petsService: PetService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle(this.titleService.getTitle() + ' - Pets');
    this.notificationService.snackbarSuccess('Welcome!');

    this.pets = this.petsService.getAll();
  }

  viewPet(id: number) {
    this.router.navigate(['/pet', id]);
  }
}
