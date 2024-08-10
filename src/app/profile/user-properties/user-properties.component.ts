import {Component, Input, OnInit} from '@angular/core';
import {Garden} from "@app/domain/garden";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {closeCircleOutline, createOutline, trash} from "ionicons/icons";
import {NgForOf} from "@angular/common";
import {GardenService} from "@app/core/store/garden/garden.service";
import {AddGardenComponent} from "@app/add-garden/add-garden.component";

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonAvatar,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    NgForOf
  ],
  standalone: true
})
export class UserPropertiesComponent {
  @Input() properties: Garden[] | undefined;

  constructor(
    private modalCtrl: ModalController,
    private gardenService: GardenService
  ) {
    addIcons({ closeCircleOutline, trash, createOutline });
  }

  public cancel(): Promise<boolean> {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async handleEditProperty(property: Garden) {
    const modal = await this.modalCtrl.create({
      component: AddGardenComponent,
      componentProps: {
        garden: property,
      },
    });

    await modal.present();
  }

  handleDeleteProperty(garden: Garden) {
    this.gardenService.removeGarden(garden);
    this.properties = this.properties?.filter((property)=> property.id!== garden.id)
  }
}
