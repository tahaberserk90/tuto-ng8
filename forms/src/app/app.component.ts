import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f',{static:false}) singupForm:NgForm;
  default:string='pet';
  answer='';
  genders=['male','female'];
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.singupForm.form.patchValue(
      {
        userData:{
          username:suggestedName
        }
      }
    );
  }

  onSubmit(form:NgForm){
    console.log(form);
  }
}
