import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
  IonText,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Garden } from '@app/domain/garden';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';

// Step 1: Add the following line...
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '@app/directives/swiper.directive';
import { SwiperContainer } from 'swiper/swiper-element';
import { ProductType } from '@app/domain/enums/product-type';
import { Feature, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import Map from 'ol/Map';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as dayjs from 'dayjs';

// Step 2: Add the following line...
register();

@Component({
  selector: 'app-garden-overview',
  templateUrl: './garden-overview.component.html',
  styleUrls: ['./garden-overview.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    FormsModule,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    NgForOf,
    SwiperDirective,
    NgOptimizedImage,
    NgStyle,
    IonText,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonPopover,
    NgIf,
    IonDatetime,
    IonFooter,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GardenOverviewComponent implements OnInit {
  @Input() garden!: Garden;
  public config!: SwiperOptions;
  public readonly productType = ProductType;
  public highlightedDates!: any[];
  public isDateEnabled!: any;

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('popover') popover!: IonPopover;

  public isPopoverOpen: boolean = false;
  public map!: Map;
  constructor(private modalCtrl: ModalController) {
    this.config = {
      spaceBetween: 10,
      navigation: true,
    };
  }

  public cancel(): Promise<boolean> {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public async showPopUp($event: MouseEvent) {
    //Bugfix because event trigger is not always working
    this.popover.event = $event;
    this.popover.side = 'top';
    this.popover.alignment = 'center';
    this.popover.reference = 'event';
    this.isPopoverOpen = true;
  }

  ngOnInit(): void {
    this.createMap();
    this.setAvailability();
  }

  private createMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 18,
      }),
    });

    let marker = new Feature({
      geometry: new Point(fromLonLat([8.601211790828547, 50.100684628456825])),
    });

    let vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });
    this.map.addLayer(vectorLayer);
    this.map.getView().animate({
      zoom: 15,
      center: fromLonLat([8.601211790828547, 50.100684628456825]),
    });
  }

  private setAvailability(): void {
    this.highlightedDates = [
      {
        date: '2024-07-05',
        textColor: 'var(--ion-color-medium)',
      },
      {
        date: '2024-07-10',
        textColor: 'var(--ion-color-medium)',
      },
      {
        date: '2024-07-20',
        textColor: 'var(--ion-color-medium)',
      },
      {
        date: '2024-07-23',
        textColor: 'var(--ion-color-medium)',
      },
    ];

    this.isDateEnabled = (dateIsoString: string) => {
      return !(
        dayjs('2024-06-05').isSame(dayjs(dateIsoString)) ||
        dayjs('2024-06-10').isSame(dayjs(dateIsoString)) ||
        dayjs('2024-06-20').isSame(dayjs(dateIsoString)) ||
        dayjs('2024-06-23').isSame(dayjs(dateIsoString))
      );
    };
  }
}
