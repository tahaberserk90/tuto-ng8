import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredinet.model';
import { ShoppingListService } from './shopping-list.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredinets:Ingredient[];

  private subChaged:Subscription;

  constructor(private shopServ:ShoppingListService) { }

  ngOnInit() {
    this.ingredinets=this.shopServ.getIngredinets();
   this.subChaged= this.shopServ.ingredientChanged.subscribe(
      (ingredinets:Ingredient[])=>{
        this.ingredinets=ingredinets;
      }
    )
  }

  onIngredientAdded(ingredient:Ingredient){
    this.ingredinets.push(ingredient);
  }

  ngOnDestroy(): void {
    this.subChaged.unsubscribe();
  }

  onEditItem(index:number){
    this.shopServ.stratEditing.next(index);
  }

}
