import { Component } from '@angular/core';

type MapNode = {
  type: 'apple' | 'shovel' | 'sprout' | 'wheelbarrow' | 'bag';
  left: string;
  top: string;
  size: 'sm' | 'md' | 'lg';
  state: 'done' | 'current' | 'locked';
};

@Component({
  selector: 'app-home-map',
  standalone: false,
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent {
  readonly nodes: MapNode[] = [
    { type: 'apple', left: '20%', top: '17%', size: 'md', state: 'done' },
    { type: 'shovel', left: '78%', top: '28%', size: 'md', state: 'done' },
    { type: 'sprout', left: '50%', top: '40%', size: 'lg', state: 'current' },
    { type: 'shovel', left: '18%', top: '54%', size: 'md', state: 'done' },
    { type: 'wheelbarrow', left: '44%', top: '66%', size: 'md', state: 'done' },
    { type: 'bag', left: '78%', top: '74%', size: 'md', state: 'locked' },
    { type: 'sprout', left: '66%', top: '88%', size: 'lg', state: 'current' }
  ];

  readonly startCta = {
    left: '66%',
    top: '82%'
  };
}
