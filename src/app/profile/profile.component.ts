import { Component } from '@angular/core';
import { UserService } from '@app/core/store/user/user.service';
import {firstValueFrom, Observable, withLatestFrom} from 'rxjs';
import { User } from '@app/domain/api-response/user-response.model';
import { LetDirective } from '@ngrx/component';
import { SignUpComponent } from '@app/sign-up/sign-up.component';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import {GardenService} from "@app/core/store/garden/garden.service";
import {Garden} from "@app/domain/garden";
import {map} from "rxjs/operators";
import {AsyncPipe} from "@angular/common";
import {GardensComponent} from "@app/gardens/gardens.component";
import {UserPropertiesComponent} from "@app/profile/user-properties/user-properties.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    LetDirective,
    IonCard,
    IonHeader,
    IonToolbar,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    AsyncPipe,
  ],
  standalone: true,
})
export class ProfileComponent {
  public signedInUser$: Observable<User | undefined>;
  public userProperties$: Observable<Garden[]>;
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private gardenService: GardenService
  ) {
    this.signedInUser$ = this.userService.getSignedInUser();
    this.userProperties$ = this.gardenService.getGardens().pipe(
      withLatestFrom(this.signedInUser$),
      map(([gardens, user])=> gardens.filter((garden)=> garden.owner.id === user?.id))
    );
  }

  public handleLogOut() {
    this.userService.signOut();
  }

  public async editProfile(signedInUser: User | undefined): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SignUpComponent,
      componentProps: {
        user: signedInUser,
      },
    });

    await modal.present();
  }

  public async showProperties(): Promise<void> {
    const properties = await firstValueFrom(this.userProperties$);
    const modal = await this.modalCtrl.create({
      component: UserPropertiesComponent,
      componentProps: {
        properties: properties,
      },
    });

    await modal.present();
  }
}
