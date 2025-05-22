import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ExposeOptionPipe implements PipeTransform {
  transform(value: any) {
    if (Array.isArray(value)) {
      return value.map(({ id, name }) => ({ id, name }));
    }
    if (value == null) return value;

    const { id, name } = value;
    return { id, name };
  }
}