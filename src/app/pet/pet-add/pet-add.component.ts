import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {

  petForm: FormGroup;
  pet: Pet;
  photoUrl: string;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private logger: NGXLogger,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private petsService: PetService) {
  }

  ngOnInit() {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      age: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.petForm.controls;
  }

  public getPhotoUrl(url: string): void {
    this.photoUrl = url;
  }

  postAdoption() {
    if (this.petForm.invalid) {
      return;
    }
    this.petsService.create({
      name: this.form.name.value,
      description: this.form.description.value,
      age: this.form.age.value,
      category: this.form.category.value,
      userId: 1,
      photo: 'ha',
    }).pipe(
      take(1)
    ).subscribe((createdPet: Pet) => {
      this.notificationService.snackbarSuccess('Your pet has been put to adoption successfully');
      this.router.navigate(['/pet', createdPet.id]);
    });
  }
}
