import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

interface Props {
  onSuccess: (credentials: FirebaseAuthTypes.UserCredential) => void,
  onError: (error: string) => void
}
const GoogleLogin = (props: Props) => {
  GoogleSignin.configure({
    webClientId: "559869071425-7mghaq8muvf5o3052qrsb33k1bf1s4q8.apps.googleusercontent.com",
  });

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const credentials = await auth().signInWithCredential(googleCredential)
      .then(credentials => props.onSuccess(credentials))
      .catch(error => {
        let errrorMessage: string = '';
        switch (error.code) {
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            errrorMessage = 'Play services not available';
          case statusCodes.SIGN_IN_CANCELLED:
            errrorMessage = 'Sign in cancelled';
          case statusCodes.SIGN_IN_REQUIRED:
            errrorMessage = 'Sign in required';
          default: {
            errrorMessage = 'Unknown error';
            console.log(errrorMessage);
          }

          props.onError(errrorMessage);
        }
      });
  }

  return (
    <GoogleSigninButton onPress={signIn} />
  )
}

export default GoogleLogin;
