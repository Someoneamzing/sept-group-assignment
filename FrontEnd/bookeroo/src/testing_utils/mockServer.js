import {setupServer} from 'msw/node';

import bookHandlers from './books_microservice/mockHandlers.js';
import loginHandlers from './login_microservice/mockHandlers.js';
import orderHandlers from './order_microservice/mockHandlers.js';

const handlers = [...bookHandlers, ...loginHandlers, ...orderHandlers];

const service = setupServer(...handlers);

beforeAll(() => service.listen());
afterEach(() => service.resetHandlers());
afterAll(() => service.close());
