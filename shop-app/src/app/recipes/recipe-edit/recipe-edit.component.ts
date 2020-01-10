import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode=false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.editMode=params['id'] !=null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeDescription=recipe.description;
      recipeImagePath=recipe.imagePath;
      if(recipe['ingredients']){
       for (let igredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(igredient.name,Validators.required),
              'amount':new FormControl(igredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'ingredients':recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    //   );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();

  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'],{relativeTo:this.route});
  }


  onDeleteIngredient(index:number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }


  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

}
