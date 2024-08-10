import {Component, Input, OnInit} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GardenService } from '@app/core/store/garden/garden.service';
import { UserService } from '@app/core/store/user/user.service';
import { firstValueFrom } from 'rxjs';
import { Garden } from '@app/domain/garden';
import { generateUuid } from '@app/core/helper/util';
import { NgForOf, NgIf } from '@angular/common';
import { ProductType } from '@app/domain/enums/product-type';
import { CapacitorPlatformService } from '@app/core/service/platform/capacitor-platform.service';
import { Photo } from '@capacitor/camera';
import {addIcons} from "ionicons";
import {cameraOutline, closeCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-add-garden',
  templateUrl: './add-garden.component.html',
  styleUrls: ['./add-garden.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    NgForOf,
    IonItem,
    NgIf,
    IonImg,
    IonIcon,
  ],
})
export class AddGardenComponent implements OnInit {
  @Input() garden: Garden | undefined;

  public gardenForm!: FormGroup;
  public ruleForm!: FormGroup;
  public photos: Photo[] = [];
  public images: string[] = [];
  public productOptions = Object.entries(ProductType).map((entry) => ({
    key: entry[0],
    value: entry[1],
  }));

  constructor(
    private modalCtrl: ModalController,
    private gardenService: GardenService,
    private userService: UserService,
    private capacitorService: CapacitorPlatformService,
  ) {
    addIcons({ cameraOutline, closeCircleOutline });
  }

  ngOnInit(): void {
    this.ruleForm = new FormGroup({
      pets: new FormControl(true, Validators.required),
      events: new FormControl(true, Validators.required),
      numberOfGuest: new FormControl('', Validators.required),
    });

    this.gardenForm = new FormGroup({
      address: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      productTypes: new FormControl('', Validators.required),
      rule: this.ruleForm,
      title: new FormControl('', Validators.required),
    });

    if (this.garden) {
      this.initGardenForm();
    }
  }

  private initGardenForm(){
    this.gardenForm.patchValue(this.garden!);
    if (this.garden?.images?.length){
      this.images = this.garden.images;
    }
  }

  public async save(): Promise<void> {
    const signedInUser = await firstValueFrom(
      this.userService.getSignedInUser(),
    );
    if (!!signedInUser) {
      const newGarden: Garden = {
        address: this.gardenForm.value.address,
        description: this.gardenForm.value.description,
        id: generateUuid(),
        owner: signedInUser,
        productTypes: this.gardenForm.value.productTypes,
        rule: this.gardenForm.value.rule,
        title: this.gardenForm.value.title,
        bookedDate: [],
        images: this.images,
        rate: Math.floor(Math.random() * 5),
      };

      this.gardenService.addGarden(newGarden);
      this.modalCtrl.dismiss(newGarden.id, 'confirm');
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public async uploadPhoto(): Promise<void> {
    const photo = await this.capacitorService.getPhoto();
    if (!!photo) {
      this.photos.push(photo);
      const base64Photo =
        await this.capacitorService.convertPhotoToBase64(photo);
      this.images.push(base64Photo);
    }
  }

  public openPhoto(path: string | undefined): void {
    if (!!path) {
      this.capacitorService.openPhoto(path);
    }
  }

  deleteImage(index: number) {
    this.images = this.images.filter((image, i) => i !== index);
  }
}
