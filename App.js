import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react';

export class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello you !</Text>
      </View>
    );
  }
}

export default withAuthenticator(App 
                // Render a sign out button once logged in
                includeGreetings = true
                // Show only certain components
                //authenticatorComponents = [MyComponents],
                // display federation/social provider buttons 
                //federated = {myFederatedConfig}, 
                // customize the UI/styling
                //theme = {myCustomTheme}
                );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
