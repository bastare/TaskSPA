/** @format */

import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../models/task.models';

@Pipe({
  name: 'Status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const result = Status[value as Status];
    return result;
  }
}
