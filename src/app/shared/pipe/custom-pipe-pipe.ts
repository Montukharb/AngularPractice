import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
})
export class CustomPipePipe implements PipeTransform {

  transform(value: string, args?: string):string {
    if(args === 'upperCase')
    {
      return value.toUpperCase();
    }
    else if(args === 'lowerCase')
    { 
      return value.toLowerCase()
    }
    else if(value === 'trim')
    {
      return value.trim()
    }

    return value;
  }

}
