import { inject, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { ProductFacade } from '../../facade/product/product.facade';

@Pipe({
  name: 'imageDownloader',
  standalone: true,
})
export class ImageDownloaderPipe implements PipeTransform {
  private product = inject(ProductFacade);

  transform(productId: number): Observable<string> {
    return this.product
      .downloadProductImage(Number(productId))
      .pipe(map((imageBlob) => URL.createObjectURL(imageBlob)));
  }
}
