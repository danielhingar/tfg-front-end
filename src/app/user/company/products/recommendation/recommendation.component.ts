import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadRecomendation();
  }

  loadRecomendation(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.productService.recommendation(id).subscribe(
          products => this.products = products.slice(0, 4)
        );
          }
    }
    );
  }

  rebaja(product: Product): number {
    return product.price - (product.price * (product.offert / 100));
  }

}
