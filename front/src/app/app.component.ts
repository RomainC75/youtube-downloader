import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { isValidUrl } from 'src/utils/url.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit{
  form!: FormGroup;
  isValid$!: Observable<any>;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      url: [null],
    })

    this.isValid$ = this.form.valueChanges.pipe(
      map(formValue => {
          console.log("=> formValue : ", formValue)
          console.log("==> is Valid url : ", isValidUrl(formValue.url))  
          if(!isValidUrl(formValue.url)){
            return true
          }       
          return false
      })
  );
  }

  onSubmitForm(){
    console.log("=> SUBMIT ", this.form.value)
  }

}
