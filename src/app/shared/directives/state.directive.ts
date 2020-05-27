import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]'
})
export class StateDirective implements OnChanges {
  @Input() appState: string;
  @HostBinding('class') nomClass: string;
  constructor() {
  }
  ngOnChanges() {
    this.nomClass = this.formatClass(this.appState);
  }

  private formatClass(state: string): string {
    return `state-${state.replace(/\s/g, '').toLowerCase()}`;
  }

}

// appState vaut CANCEL => state-cancel
// appState vaut OPTION => state-option
// appState vaut CONFIRMED => state-confirmed
// appState vaut ACTIVE => state-active
// appState vaut INACTIVE => state-inactive
// binder l'attribut class du host element td avec state-cancel, state-option ou state-confirmed
