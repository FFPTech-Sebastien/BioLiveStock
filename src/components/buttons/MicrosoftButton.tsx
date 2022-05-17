import React from 'react';
import { Image, Omit } from 'react-native';
import DefaultButton from './DefaultButton';

// Omit the declared props from the DefaultButton props
type MergeElementProps<
    T extends React.ElementType,
    P extends Record<string, unknown>
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

type MicrosoftButtonProps = MergeElementProps<
    typeof DefaultButton,
    {
        /**
         * The title of the button.
         * @default 'Sign in with Microsoft'
         */
        title?: string;
    }
>;

const MicrosoftButton: React.FC<MicrosoftButtonProps> = ({
    title,
    ...props
}) => {
    return (
        <DefaultButton
            {...props}
            title={title ?? 'Sign in with Microsoft'}
            iconLeft={() => (
                <Image
                    source={{
                        uri: 'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_640.png',
                    }}
                    style={[
                        {
                            width: 20,
                            height: 20,
                            resizeMode: 'cover',
                        },
                    ]}
                />
            )}
        />
    );
};

export default MicrosoftButton;
