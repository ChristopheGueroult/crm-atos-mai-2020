import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { Btn } from 'src/app/shared/interfaces/btn';
import { StateClient } from 'src/app/shared/enums/state-client.enum';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit {
  public collection$: Observable<Client[]>;
  public headers: string[];
  public btnRoute: Btn;
  public title: string;
  public subtitle: string;
  public states = Object.values(StateClient);
  constructor(private cs: ClientsService) { }

  ngOnInit(): void {
    this.title = 'Clients';
    this.subtitle = 'All clients';
    this.btnRoute = {
      label: 'Add a client',
      route: 'add'
    };
    this.collection$ = this.cs.collection;
    this.headers = [
      'Name',
      'CA HT',
      'CA TTC',
      'State'
    ];
  }

  public changeState(item: Client, event) {
    this.cs.changeState(item, event.target.value).subscribe((res) => {
      // traiter la res de l'api, codes erreur etc...
      item.state = res.state;
    });
  }
}
