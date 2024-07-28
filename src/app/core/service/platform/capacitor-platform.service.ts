import { Injectable } from '@angular/core';
import { FileOpener } from '@capacitor-community/file-opener';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CapacitorPlatformService {
  constructor() {}

  public async getPhoto(): Promise<Photo | void> {
    return Camera.getPhoto({
      quality: 100,
      width: 1920,
      height: 1800,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    })
      .then((photo) => photo)
      .catch((error) => console.error(`Cannot get picture: ${error}`));
  }

  public openPhoto(path: string): void {
    FileOpener.open({ filePath: path })
      .then(() => console.info(`Opened Picture`))
      .catch((error) => console.error(`Cannot opening picture: ${error}`));
  }

  public async convertPhotoToBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob);
  }

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
