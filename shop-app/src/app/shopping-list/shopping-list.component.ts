import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredinet.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredinets:Ingredient[]=[
    new Ingredient('Apel',10),
    new Ingredient('banan',5)
  ];

  constructor() { }

  ngOnInit() {
  }

}
