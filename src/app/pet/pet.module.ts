import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetAddComponent } from './pet-add/pet-add.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { MatSliderModule } from '@angular/material';
import { UploadPhotoComponent } from './pet-add/upload-photo/upload-photo.component';

@NgModule({
  declarations: [PetListComponent, PetAddComponent, PetDetailsComponent, UploadPhotoComponent],
  imports: [
    CommonModule,
    PetRoutingModule,
    SharedModule,
    MatSliderModule,
  ],
  entryComponents: []
})
export class PetModule {
}
