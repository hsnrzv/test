import { Component, Input } from '@angular/core';
import { Garden } from '@app/domain/garden';
import { IonicModule } from '@ionic/angular';
import { NgClass, NgIf } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { GardenOverviewComponent } from '@app/gardens/garden-overview/garden-overview.component';

@Component({
  selector: 'app-garden-item',
  templateUrl: './garden-item.component.html',
  styleUrls: ['./garden-item.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgClass],
})
export class GardenItemComponent {
  @Input() garden!: Garden;
  public clicked: boolean = false;
  constructor(private modalCtrl: ModalController) {}

  public async openGardenDetail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: GardenOverviewComponent,
      componentProps: {
        garden: this.garden,
      },
      canDismiss: true,
      backdropDismiss: true,
    });
    await modal.present();
  }
}
