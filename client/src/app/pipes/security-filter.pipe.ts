import { Pipe, PipeTransform } from '@angular/core';
import { SecurityData } from '../models/security-data';

@Pipe({ name: 'securityFilter' })
export class SecurityFilterPipe implements PipeTransform {
  transform(securities: SecurityData[], input: string) {
    if (input) {
      input = input.toLowerCase();
      return securities.filter(
        (security: SecurityData) => security.security.toLowerCase().indexOf(input) > -1
      );
    }
    return securities;
  }
}
