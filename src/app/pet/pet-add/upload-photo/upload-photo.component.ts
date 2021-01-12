import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPhotoComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  @Output() public getPhotoUrl = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    if (fileInput.target.files) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
      this.upload();
    }
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  upload() {
    const formData = new FormData();
    formData.append('files', this.fileData);
    this.fileUploadProgress = '0%';
    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        this.getPhotoUrl.emit(events.url);
      }
    });
  }
}


