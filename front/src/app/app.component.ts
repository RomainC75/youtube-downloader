import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { isValidUrl } from 'src/utils/url.utils';
import { YtdlService } from './services/ytdl.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit{
  form!: FormGroup;
  isValid$!: Observable<any>;
  options$!: Observable<any>;
  infos: any=null

  constructor(private formBuilder: FormBuilder, private ytdlService: YtdlService){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      url: [null],
    })

    this.isValid$ = this.form.valueChanges.pipe(
      map(formValue => {
          // console.log("=> formValue : ", formValue)
          // console.log("==> is Valid url : ", isValidUrl(formValue.url))  
          if(!isValidUrl(formValue.url)){
            return true
          }       
          return false
      })
    );

    
  }

  onSubmitForm(){
    console.log("=> SUBMIT ", this.form.value)
    this.options$=this.ytdlService.getInfos(this.form.value.url).pipe(tap(value=>console.log(value)))
    // this.options$ = this.ytdlService.getInfos(this.form.value.url).subscribe(value=>console.log('==> ', value))
  }

}
