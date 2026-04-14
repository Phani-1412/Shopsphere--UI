import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cardByKey' })
export class CardByKeyPipe implements PipeTransform {
  transform(cards: any[], key: string, field: string): any {
    const card = cards.find(c => c.key === key);
    return card ? card[field] : '';
  }
}
