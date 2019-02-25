import { Injectable } from '@angular/core';
 
import { Observable, of } from 'rxjs';
 
import { Hero } from './heroes/hero';
import { HEROES } from './heroes/mock-heros';
import { MessageService } from './message.service';
 
@Injectable({
  providedIn: 'root',
})
export class HeroService {
 
  constructor(private messageService: MessageService) { }
 
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    this.messageService.add('HeroService: fetched heroes1');
    return of(HEROES);
  }
}