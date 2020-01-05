import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredinet.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:false})
  nameInput:ElementRef;
  @ViewChild('amountInput',{static:false})
  amountInput:ElementRef;
 

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  }

  addItem(){
    const name=this.nameInput.nativeElement.value;
    const amount=this.amountInput.nativeElement.value;
    const ingredient=new Ingredient(name,amount);
    this.slService.ingredientAdded(ingredient);
  }

}
