import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../../services/routes';
import { COLOR } from '../utils/color';
import { FONTS } from '../utils/fontFamily';
import Lead from '../screens/lead/Lead';
import Home from '../screens/home/Home';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Navigation = ({ navigation }) => {
    const navigationRef = useRef();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {/* <Stack.Screen
                    name={ROUTES.HOME}
                    component={Home}
                    options={{ headerShown: false }}
                /> */}

                <Stack.Screen
                    name={ROUTES.LEAD}
                    component={Lead}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default Navigation;

const styles = StyleSheet.create({

});