import Hashids from 'hashids';
import { isEmpty } from 'lodash';
import { format } from 'date-fns';

export function encodeId(id: number) {
  const hashids = new Hashids(process.env.HASH_KEY);
  const now = new Date();
  const timestamp = now.getTime();
  const dateTime = parseInt(format(new Date(), 'yyyyMMddHHmmss'));

  return hashids.encode(id, timestamp, dateTime);
}

export function decodeId(hash: string) {
  const hashids = new Hashids(process.env.HASH_KEY);
  const decode = hashids.decode(hash);

  return !isEmpty(decode) ? decode[0] : 0;
}
