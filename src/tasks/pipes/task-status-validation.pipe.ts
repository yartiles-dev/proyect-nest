import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform{
  readonly allowedStatuses = [ TaskStatus.IN_PROGRESS, TaskStatus.OPEN, TaskStatus.DONE ]

  transform(value: string, metadata: ArgumentMetadata): any {
    console.log('metadata', metadata)
    value = value.toUpperCase()

    if(!this.isStatusValid(value))
      throw new BadRequestException(`"${value}" is an invalid password`);

    return value
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.indexOf(status) !== -1
  }
}
