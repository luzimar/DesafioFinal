import React from 'react';
import CustomHeader from '~/components/Header';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Subscription from '~/pages/Subscription';
import Profile from '~/pages/Profile';

const tabs = createBottomTabNavigator(
  {
    Dashboard,
    Subscription,
    Profile,
  },
  {
    tabBarOptions: {
      header: { visible: true },
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      style: {
        backgroundColor: '#2B1A2F',
      },
    },
  }
);
export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            tabs,
          },
          {
            defaultNavigationOptions: {
              header: <CustomHeader />,
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
