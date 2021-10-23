import {setupServer} from 'msw/node';
import bookEndpoints from './books_microservice/endpoints';
import loginEndpoints from './login_microservice/endpoints';
// based on https://testing-library.com/docs/react-testing-library/example-intro/

const bigMicroservice = setupServer(...bookEndpoints, ...loginEndpoints);

beforeAll(() => bigMicroservice.listen());
afterEach(() => bigMicroservice.resetHandlers());
afterAll(() => bigMicroservice.close());

export default bigMicroservice;
