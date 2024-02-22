import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../../services/routes';
import { COLOR } from '../utils/color';
import { FONTS } from '../utils/fontFamily';
import Lead from '../screens/lead/Lead';
import Home from '../screens/home/Home';
import { useEffect, useRef } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UserDetail from '../screens/user/UserDetail';
import CardDetails from '../screens/card/CardDetails';
import OrderSummary from '../screens/order/OrderSummary';
import { KEYS, getItemFromStorage, setItemToStorage } from '../../services/storage';

const Stack = createNativeStackNavigator();

const Navigation = ({ navigation }) => {


    const navigationRef = useRef();

    useEffect(() => {
        const getInitialRoute = async () => {
            try {
                const lastScreen = await getItemFromStorage(KEYS.lastScreen);
                if (lastScreen) {
                    navigationRef.current?.navigate(lastScreen);
                }
            } catch (error) {
                console.error('Error reading last screen from AsyncStorage:', error);
            }
        };

        getInitialRoute();

        const backHandler = () => {
            const currentRoute = navigationRef.current?.getCurrentRoute()?.name;

            switch (currentRoute) {
                case ROUTES.LEAD:
                    navigationRef.current?.navigate(ROUTES.HOME);
                    return true;
                case ROUTES.USER_DETAIL:
                    navigationRef.current?.navigate(ROUTES.LEAD);
                    return true;
                case ROUTES.CARD_DETAIL:
                    navigationRef.current?.navigate(ROUTES.USER_DETAIL);
                    return true;
                default:
                    return false;
            }
        };

        const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', backHandler);

        return () => backHandlerSubscription.remove();
    }, []);

    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{
                animation:'slide_from_right',
            }}>
                <Stack.Screen
                    name={ROUTES.HOME}
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name={ROUTES.LEAD}
                    component={Lead}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name={ROUTES.USER_DETAIL}
                    component={UserDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={ROUTES.CARD_DETAIL}
                    component={CardDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={ROUTES.ORDER_SUMMARY}
                    component={OrderSummary}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default Navigation;

const styles = StyleSheet.create({

});