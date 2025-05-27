import { Injectable, Logger } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { MrgDataEntity } from '../entities/data.entity';

@Injectable()
export class ExcelParserService {
  private readonly logger = new Logger(ExcelParserService.name);
  parse(buffer: Buffer): MrgDataEntity[] {
    try {
      this.logger.log('Начало парсинга файла');
      const workbook = XLSX.read(buffer, {
        type: 'buffer',
        cellDates: true,
        sheetStubs: true,
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      this.logger.debug(`Лист найден: ${workbook.SheetNames[0]}`);

      const headers = this.parseHeaders(sheet);
      this.logger.debug('Распознанные заголовки:', headers);

      const data = this.parseData(sheet, headers);
      this.logger.log(`Успешно распаршено записей: ${data.length}`);

      return data;
    } catch (error) {
      let errorMessage = 'Неизвестная ошибка';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = String(error);
      }

      this.logger.error(`Ошибка парсинга: ${errorMessage}`);
      throw new Error(`Некорректный формат файла: ${errorMessage}`);
    }
  }

  private mapMainHeader(header: string): string {
    /* eslint-disable */
    const headerMap: Record<string, string> = {
      'Магистральный распределительный газопровод': 'mrg',
      'Точка подключения': 'mg',
      'Период': 'date',
      'Уровень загрузки': 'loadLevel',
      'Факт. среднесут. расход, млн.м3/сут': 'fact',
      'ТВПС, млн. м3/сут': 'tvps',
    };
    /* eslint-enable */
    return headerMap[header] || `unknown_${header}`;
  }

  private parseHeaders(sheet: XLSX.WorkSheet): string[] {
    try {
      if (!sheet['!ref']) throw new Error('Лист пуст');

      const range = XLSX.utils.decode_range(sheet['!ref']);
      const headers: string[] = [];

      const mergeMap = new Map();

      (sheet['!merges'] || []).forEach((merge) => {
        for (let c = merge.s.c; c <= merge.e.c; c++) {
          mergeMap.set(`${merge.s.r}:${c}`, merge);
        }
      });

      for (let col = range.s.c; col <= range.e.c; col++) {
        const mainHeaderCell = XLSX.utils.encode_cell({ r: 0, c: col });
        const mainHeader = sheet[mainHeaderCell]?.v?.toString().trim() || '';

        const merge = mergeMap.get(`0:${col}`);
        if (merge) {
          headers[col] = this.mapMainHeader(
            sheet[XLSX.utils.encode_cell({ r: 0, c: merge.s.c })]?.v
              ?.toString()
              .trim(),
          );
          continue;
        }

        headers[col] = this.mapMainHeader(mainHeader);
      }

      for (let col = range.s.c; col <= range.e.c; col++) {
        const subHeaderCell = XLSX.utils.encode_cell({ r: 1, c: col });
        const subHeader = sheet[subHeaderCell]?.v?.toString().trim() || '';

        if (headers[col] === 'mg' && subHeader === 'км') {
          headers[col] = 'km';
        }
      }
      return headers;
    } catch (error) {
      this.logger.error('Ошибка чтения заголовка:', error);
      throw new Error('Ошибка чтения заголовков');
    }
  }

  private parseData(sheet: XLSX.WorkSheet, headers: string[]): MrgDataEntity[] {
    const data = XLSX.utils.sheet_to_json(sheet, {
      header: headers,
      range: 2,
      blankrows: false,
      defval: null,
      dateNF: 'YYYY-MM-DD HH:mm:ss',
    });

    return data
      .map((row: MrgDataEntity, index) => {
        try {
          return {
            mrg: String(row.mrg || ''),
            mg: String(row.mg || ''),
            km: this.parseNumber(row.km),
            date: this.parseDate(row.date || ''),
            loadLevel: this.parseNumber(row.loadLevel, 100),
            fact: this.parseNumber(row.fact),
            tvps: this.parseNumber(row.tvps),
          };
        } catch (error) {
          this.logger.warn(`Ошибка в строке ${index + 3}: ${error}`);
          return null;
        }
      })
      .filter((item): item is MrgDataEntity => item !== null);
  }

  private parseNumber(value: any, maxValue?: number): number {
    const num = Number(
      String(value)
        .replace(',', '.')
        .replace(/[^0-9.-]/g, ''),
    );

    // if (isNaN(num)) return 0;

    if (maxValue && num > maxValue)
      throw new Error(`Значение превышает максимум: ${num} > ${maxValue}`);

    return Number(num.toFixed(2));
  }

  private parseDate(value: string): string {
    const date = new Date(value);
    date.setTime(date.getTime() + 6 * 3600 * 1000);

    return date.toISOString();
  }
}
