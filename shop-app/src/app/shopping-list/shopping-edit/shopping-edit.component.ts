import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredinet.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f',{static:false})
  slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editItem:Ingredient;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.stratEditing.subscribe(
      (index:number)=>{
        this.editItemIndex=index;
        this.editMode=true;
        this.editItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        })
      }
    );
  }

  addItem(form:NgForm){
    const value= form.value;
    const ingredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,ingredient);
    }else {
      this.slService.ingredientAdded(ingredient);
    }
    form.reset();
    this.editMode=false;

  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
  this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
