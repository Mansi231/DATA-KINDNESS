import React, { useState } from 'react';
import { View, WebView } from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISH_KEY } from "@env"
import { COLOR } from '../../utils/color';

const PaymentScreen = () => {
    const { confirmPayment } = useStripe();

    return (
        <View style={{ flex: 1 }}>
            <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: COLOR.screenBg,
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
            </StripeProvider>
        </View>
    );
};

export default PaymentScreen;
