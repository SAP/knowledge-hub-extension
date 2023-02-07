import * as actions from '../src/const';

describe('const', () => {
    test('Sync actions', () => {
        const actionFactory = actions.createActionFactory('PREFIX_SYNC');
        const actionProd = actionFactory('TEST_SYNC_ACTION');
        expect(actionProd.type).toBe('PREFIX_SYNC TEST_SYNC_ACTION');
        const action = actionProd('PAYLOAD');
        expect(action).toEqual({
            type: 'PREFIX_SYNC TEST_SYNC_ACTION',
            payload: 'PAYLOAD'
        });
    });

    test('Async actions', () => {
        const asyncActionFactory = actions.createAsyncActionFactory('PREFIX_ASYNC');
        const { pending, fulfilled, rejected } = asyncActionFactory('TEST_ASYNC_ACTION');

        expect(pending.type).toBe('PREFIX_ASYNC TEST_ASYNC_ACTION <pending>');
        expect(pending.match({ type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <pending>' })).toBeTruthy();
        expect(pending(true)).toEqual({
            type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <pending>',
            payload: undefined,
            pending: true
        });

        expect(fulfilled.type).toBe('PREFIX_ASYNC TEST_ASYNC_ACTION <fulfilled>');
        expect(fulfilled.match('')).toBeFalsy();
        expect(fulfilled.match({ type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <fulfilled>' })).toBeTruthy();
        expect(fulfilled('PF')).toEqual({ type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <fulfilled>', payload: 'PF' });

        expect(rejected.type).toBe('PREFIX_ASYNC TEST_ASYNC_ACTION <rejected>');
        expect(rejected.match('')).toBeFalsy();
        expect(rejected.match({ type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <rejected>' })).toBeTruthy();
        expect(rejected('ERROR_MESSAGE', 'PR')).toEqual({
            type: 'PREFIX_ASYNC TEST_ASYNC_ACTION <rejected>',
            payload: 'PR',
            error: { message: 'ERROR_MESSAGE' }
        });
    });
});
