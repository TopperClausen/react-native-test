import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface Props {
  onSuccess: (credentials: FirebaseAuthTypes.UserCredential) => void
}

const GoogleLogin = (props: Props) => {
  GoogleSignin.configure({
    webClientId: "559869071425-7mghaq8muvf5o3052qrsb33k1bf1s4q8.apps.googleusercontent.com",
  });

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const credentials = await auth().signInWithCredential(googleCredential);

    props.onSuccess(credentials);
  }

  return (
    <GoogleSigninButton onPress={signIn} />
  )
}

export default GoogleLogin;
