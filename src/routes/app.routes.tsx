import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';
import { PlusCircle, SoccerBall } from 'phosphor-react-native'; 
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    const { colors } = useTheme(); 

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle:{
                position: 'absolute',
                height: 87,
                borderTopWidth: 0,
                backgroundColor: colors.gray[800],
            },
            tabBarItemStyle:{
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>
            <Screen 
                name="new"
                component={New}
                options={{
                    tabBarIcon: ( { color } ) => <PlusCircle color={color}/>,
                    tabBarLabel: 'Novo bolão'
                }}
            />
            <Screen 
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon: ({ color }) => <SoccerBall  color={ color }/>,
                    tabBarLabel: 'Meus Bolões'
                }}
            />
            
            <Screen 
                name="find"
                component={Find}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Navigator>
    )
}