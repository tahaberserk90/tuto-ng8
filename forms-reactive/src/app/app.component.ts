import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  genders = ['male', 'female'];
  singupForm:FormGroup;
  forbiddenUserNames=['Anna','Jon'];

  ngOnInit(): void {
    this.singupForm=new FormGroup(
      {
        'userData':new FormGroup({
          'username':new FormControl(null,[Validators.required,this.ForbiddenNames.bind(this)]),
          'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)
        }),
        'gender':new FormControl('male'),
        'hobbies':new FormArray([])
      }
      );
  }

  onSubmit(){
    console.log(this.singupForm);
  }
  onAddHobby(){
    const control=new FormControl(null,Validators.required);
    (this.singupForm.get('hobbies') as FormArray).push(control);
  }

  get controls() {
    return (this.singupForm.get('hobbies') as FormArray).controls;
  }

  ForbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'isForbiddenName':true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl):Promise<any>|Observable<any>{
    const promise = new Promise<any>(
      (resolve,reject)=>{
        setTimeout(()=>{
          if(control.value === 'test@test.com'){
            resolve({isFormbiddenEmail:true});
          }else{
            resolve(null);
          }
        },1500);
      }
    );
    return promise;
  }
}
