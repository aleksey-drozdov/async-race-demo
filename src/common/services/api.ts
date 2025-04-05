import { TDataWithId } from '../../interfaces/common.ts';
import { ICar } from '../../interfaces/car.ts';

const baseUrl = 'http://127.0.0.1:3000';

const API = {
  getCars: (page: number = 0, limit: number = 5): Promise<TDataWithId<ICar>[]> => {
    const params = new URLSearchParams();
    params.append('_page', page.toString());
    params.append('_limit', limit.toString());

    return fetch(`${baseUrl}/garage?${params}`).then(res => res.json());
  },
};

export default API;
