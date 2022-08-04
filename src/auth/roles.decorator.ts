import { CustomDecorator, SetMetadata } from '@nestjs/common';
export const hasRoles = (...roles: string[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
