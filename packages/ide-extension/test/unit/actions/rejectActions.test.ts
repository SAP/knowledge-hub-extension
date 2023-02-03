import { fetchTutorials } from '@sap/knowledge-hub-extension-types';
import { getGenericRejectAction } from '../../../src/actions/rejectActions';

describe('getGenericRejectAction', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Existing action', async () => {
        const action = fetchTutorials.pending(true);
        const rejectedAction = getGenericRejectAction(action, 'Dummy error');
        expect(rejectedAction).toEqual({
            error: {
                message: 'Dummy error'
            },
            payload: undefined,
            type: '[core] tutorials/fetch <rejected>',
            showMessage: true
        });
    });

    test('Unexisting action', async () => {
        const rejectedAction = getGenericRejectAction({ type: 'dummy' }, 'Dummy error');
        expect(rejectedAction).toEqual(undefined);
    });
});
