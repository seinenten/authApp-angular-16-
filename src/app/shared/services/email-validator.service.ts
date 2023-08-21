import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    
    const email = control.value;
    

    const httpCallObservable = new Observable<ValidationErrors | null>( (susbcriber) => {
        console.log({email});

        if( email === 'jorgefa@live.com.mx' ){
          susbcriber.next({ emailTaken: true });
          susbcriber.complete()
        }
        
        susbcriber.next(null);
        susbcriber.complete();

    });
                 //TODOs El pipe lo puse para que tarde la validacion borrar si no se ocupa
    return httpCallObservable.pipe(delay(2000));
  }


  //! VALIDACION POR API

    // return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
            // .pipe(
            //   // delay(3000),
            //   map( resp => {
            //     return ( resp.length === 0 )
            //         ? null
            //         : { emailTaken: true }
            //   })
            // );


}
