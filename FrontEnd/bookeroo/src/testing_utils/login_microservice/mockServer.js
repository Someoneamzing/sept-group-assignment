import {setupServer} from 'msw/node';
import endpoints from './endpoints';
// based on https://testing-library.com/docs/react-testing-library/example-intro/

const loginMsService = setupServer(...endpoints);

beforeAll(() => loginMsService.listen());
afterEach(() => loginMsService.resetHandlers());
afterAll(() => loginMsService.close());

export default loginMsService;
