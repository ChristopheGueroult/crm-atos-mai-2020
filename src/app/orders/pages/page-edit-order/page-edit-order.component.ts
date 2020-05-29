import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss']
})
export class PageEditOrderComponent implements OnInit {
  // public item: Order;
  public title: string;
  public subtitle: string;
  public item$: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private os: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   // console.log(res.get('id'));
    //   const id = params.get('id');
    //   this.os.getItemById(id).subscribe((item) => {
    //     console.log(item);
    //     this.item = item;
    //   });
    // });
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.os.getItemById(params.get('id')))
    );

    this.route.data.subscribe((datas) => {
      this.title = datas.title;
      this.subtitle = datas.subtitle;
    });
  }

  public edit(item: Order) {
    this.os.updateItem(item).subscribe((res) => {
      // console.log(res);
      this.router.navigate(['orders']);
    });

  }

}
