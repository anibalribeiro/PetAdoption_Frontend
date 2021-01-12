import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../auth/models/loginResponse.model';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  pet: Observable<Pet>;
  loggedUser: LoginResponse;

  constructor(private route: ActivatedRoute,
              private notificationService: NotificationService,
              private authService: AuthenticationService,
              private petService: PetService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser();
    this.pet = this.getPet(this.route.snapshot.paramMap.get('id'));
    console.log(this.loggedUser);
  }

  getPet(id): Observable<Pet> {
    return this.petService.get(id).pipe(
      tap(pet => {
        console.log(pet);
        this.titleService.setTitle(this.titleService.getTitle() + ' - ' + pet.name);
      })
    );
  }
}
