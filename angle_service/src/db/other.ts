import db from './index';
import { Sql } from '@/enums/sql';
import { Location } from './types';

export async function insertLoginUserLogs(
  config: Pick<Location, 'longitude' | 'latitude' | 'username'>
) {
  return await db.query(Sql.INSERT_LOCATION, [
    config.longitude,
    config.latitude,
    config.username,
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  ]);
}
