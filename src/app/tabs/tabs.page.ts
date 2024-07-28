import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonTabBar,
  IonTabButton,
  IonTabs,
  ModalController,
} from '@ionic/angular/standalone';
import { UserService } from '@app/core/store/user/user.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { User } from '@app/domain/api-response/user-response.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { AddGardenComponent } from '@app/add-garden/add-garden.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonHeader,
    IonContent,
    NgIf,
    AsyncPipe,
    IonPopover,
    IonList,
    IonItem,
    IonButton,
  ],
})
export class TabsPage {
  public signedInUser$: Observable<User | undefined> = of(undefined);
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {
    this.signedInUser$ = this.userService.getSignedInUser();
  }

  public async addProductModal(): Promise<void> {}

  public async handleProfilePage(): Promise<void> {}

  async addGardenModal() {
    const signedInUser = await firstValueFrom(this.signedInUser$);
    let isSignedIn = !!signedInUser;
    if (!isSignedIn) {
      isSignedIn = await this.userService.handleUserSignIn();
    }

    if (isSignedIn) {
      const modal = await this.modalCtrl.create({
        component: AddGardenComponent,
      });
      await modal.present();
    }
  }
}
