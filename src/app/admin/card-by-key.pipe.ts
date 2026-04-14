import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'cardByKey' })
export class CardByKeyPipe implements PipeTransform {
  transform(cards: any[], key: string): any {
    return cards.find(c => c.key === key);
  }
}
 