import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable({
    
})
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "postgresql://postgres:123@localhost:5434/learn_fun_nest_dev_db?schema=public"
                },
            }
        });
    }
}
