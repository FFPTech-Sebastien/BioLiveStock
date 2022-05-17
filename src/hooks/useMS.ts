import { loginMS, useAppDispatch } from '@state';
import {
    exchangeCodeAsync,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery,
} from 'expo-auth-session';
import { useEffect } from 'react';

const useMS = () => {
    const dispatch = useAppDispatch();

    const discovery = useAutoDiscovery(
        'https://login.microsoftonline.com/864527f6-8343-4661-bf21-23a212cfe01b'
    );

    const config = {
        clientId: 'addfc683-49ab-46dc-b9a8-8b8131361cd5',
        scopes: ['User.Read'],
        redirectUri: makeRedirectUri({
            scheme: 'exp://192.168.0.134:19000',
        }),
        codeChallenge: 'CODE_CHALLENGE',
        codeChallengeMethod: 'S256',
        usePKCE: true,
    };

    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    useEffect(() => {
        if (response) {
            if (response.type === 'success') {
                (async () => {
                    try {
                        // retrieve the access token from the response
                        const { accessToken } = await exchangeCodeAsync(
                            {
                                ...config,
                                code: response.params.code,
                                grant_type: 'authorization_code',
                                extraParams: {
                                    code_verifier: request?.codeVerifier || '',
                                },
                            },
                            {
                                tokenEndpoint:
                                    'https://login.microsoftonline.com/864527f6-8343-4661-bf21-23a212cfe01b/oauth2/v2.0/token',
                            }
                        );
                        // dispatch the access token to the store & login with microsoft through the api
                        dispatch(loginMS(accessToken));
                    } catch (err) {
                        console.log(err);
                    }
                })();
            } else if (response.type === 'cancel') {
                // loginMSCancel();
            }
        }
    }, [response]);

    return { promptAsync };
};

export default useMS;
