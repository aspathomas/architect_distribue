Pour lancer le programme, il faut d'abord lancer ngrok en mode `ngrok start --all` pour que l'application puisse communiquer avec les services (ASR et NLP) locaux.

Une fois les services et ngrok prêts, il faut placer `audio_test.wav` dans `/sdcards/` du téléphone grâce à la commande `adb push`, on peut vérifier l'existence du fichier en faisant `ls` en mode `adb shell`.

Une fois l'application lancée grâce à `npx react-native start`, lancer un enregistrement et le terminer instantanément pour envoyer le fichier et récupérer la commande.
