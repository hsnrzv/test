import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  imports: [IonContent, IonItem, IonPopover, IonList, IonButton],
  standalone: true,
})
export class AddProductComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
