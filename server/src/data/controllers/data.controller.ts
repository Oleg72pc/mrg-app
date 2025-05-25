import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelParserService } from '../services/excel-parser.service';
import { JsonDbService } from '../services/json-db.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MrgDataResponseDto } from '../dto/upload-data.dto';

@ApiTags('Данные МРГ')
@Controller('data')
export class DataController {
  constructor(
    private readonly parser: ExcelParserService,
    private readonly db: JsonDbService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Загрузка данных из Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Excel файл с данными',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    type: [MrgDataResponseDto],
    description: 'Данные успешно загружены',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректный формат файла',
  })
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<MrgDataResponseDto[]> {
    const parsedData = this.parser.parse(file.buffer);
    await this.db.save(parsedData);
    return parsedData;
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех данных' })
  @ApiResponse({
    status: 200,
    description: 'Данные успешно получены',
    type: [MrgDataResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Данные не найдены',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  async getAll(): Promise<MrgDataResponseDto[]> {
    try {
      const data = await this.db.load();

      if (data.length === 0) {
        throw new HttpException('Данные не найдены', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Внутренняя ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
