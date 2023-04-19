import { getConnection } from 'typeorm';

global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
