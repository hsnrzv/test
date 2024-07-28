import { Component } from '@angular/core';
import { GardenItemComponent } from '@app/gardens/garden-item/garden-item.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Garden } from '@app/domain/garden';
import { GardenService } from '@app/core/store/garden/garden.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.component.html',
  styleUrls: ['./gardens.component.scss'],
  imports: [GardenItemComponent, NgForOf, AsyncPipe, IonicModule],
  standalone: true,
})
export class GardensComponent {
  public gardens$: Observable<Garden[]> = of([]);
  constructor(private gardenService: GardenService) {
    this.gardens$ = this.gardenService.getGardens();
  }
}
