import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

import type {ScreenNavigationType, RootStackParamList} from '../router';

function useNav() {
  const navigation: ScreenNavigationType = useNavigation();
  const route: RouteProp<RootStackParamList, 'ChatRoom'> = useRoute();

  return {navigation, route};
}

export default useNav;
