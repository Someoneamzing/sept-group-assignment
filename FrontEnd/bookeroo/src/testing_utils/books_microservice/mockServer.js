import {setupServer} from 'msw/node';
import endpoints from './endpoints';
// based on https://testing-library.com/docs/react-testing-library/example-intro/

const BookMsServer = setupServer(...endpoints);

beforeAll(() => BookMsServer.listen());
afterEach(() => BookMsServer.resetHandlers());
afterAll(() => BookMsServer.close());

export default BookMsServer;
