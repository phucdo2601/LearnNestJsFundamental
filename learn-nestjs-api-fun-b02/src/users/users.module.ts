import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
  /**
   * Now the JwtStrategy can be used by other modules. You have also added the UsersModule in the imports, 
   * because the UsersService is being used in the JwtStrategy class.

To make UsersService accessible in the JwtStrategy class, you also need to add it in the 
  exports of the UsersModule:
   */
  exports: [UsersService]
})
export class UsersModule {}
