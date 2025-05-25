import { Injectable, Logger } from '@nestjs/common';
import { MrgDataEntity } from '../entities/data.entity';
import * as path from 'path';
import * as fs from 'fs/promises';

interface SystemError extends Error {
  code?: string;
  stack?: string;
}

@Injectable()
export class JsonDbService {
  private readonly dbPath = path.join(process.cwd(), 'data', 'db.json');
  private readonly logger = new Logger(JsonDbService.name);

  async save(data: MrgDataEntity[]): Promise<void> {
    try {
      const formattedData = JSON.stringify(data, null, 2);
      await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
      await fs.writeFile(this.dbPath, formattedData, 'utf8');
      this.logger.log(`Данные сохранены (${data.length} записей)`);
    } catch (error) {
      const message = this.getErrorMessage(error);
      const stack = this.getErrorStack(error);
      this.logger.error(`Ошибка сохранения данных: ${message}`, stack);
      throw new Error('Ошибка записи в БД');
    }
  }

  async load(): Promise<MrgDataEntity[]> {
    try {
      await fs.access(this.dbPath);
      this.logger.log(`Чтение данных из: ${this.dbPath}`);

      const data = await fs.readFile(this.dbPath, 'utf8');
      const parsed = JSON.parse(data) as MrgDataEntity[];

      this.logger.log(`Прочитано записей: ${parsed.length}`);
      return parsed;
    } catch (error) {
      if (this.isSystemError(error) && error.code === 'ENOENT') {
        this.logger.warn('Файл БД не найден');
        return [];
      }

      const message = this.getErrorMessage(error);
      const stack = this.getErrorStack(error);
      this.logger.error(`Ошибка чтения данных: ${message}`, stack);
      throw new Error('Ошибка чтения БД');
    }
  }

  private isSystemError(error: unknown): error is SystemError {
    return error instanceof Error && 'code' in error;
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as { message: unknown }).message);
    }
    return String(error);
  }

  private getErrorStack(error: unknown): string | undefined {
    if (error instanceof Error) return error.stack;
    return undefined;
  }
}
