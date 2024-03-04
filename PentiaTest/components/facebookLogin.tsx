import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const FacebookLogin = () => {
  const handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  return (
    <Button
      title="Facebook Sign-In"
      onPress={() => handleFacebookLogin()}
    />
  )
}

export default FacebookLogin;