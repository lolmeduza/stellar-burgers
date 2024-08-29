// mocks/handlers.ts
import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

const URL = process.env.BURGER_API_URL;

export const handlers = [
  http.get(`${URL}/ingredients`, () => {
    return HttpResponse.json();
  })
];
