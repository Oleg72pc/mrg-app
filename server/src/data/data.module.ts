import { Module } from '@nestjs/common';
import { DataController } from './controllers/data.controller';
import { ExcelParserService } from './services/excel-parser.service';
import { JsonDbService } from './services/json-db.service';

@Module({
  controllers: [DataController],
  providers: [ExcelParserService, JsonDbService],
})
export class DataModule {}
