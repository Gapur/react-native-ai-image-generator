import {useState, useTransition} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

function App(): React.JSX.Element {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function generateImage() {
    startTransition(async () => {
      setImageUrl(undefined);
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>AI Image Generator</Text>

          {imageUrl ? (
            <Image style={styles.image} source={imageUrl as any} />
          ) : (
            <View style={styles.imagePreview} />
          )}
        </View>

        <View>
          <TextInput
            style={[styles.input, inputText ? styles.emptyInput : {}]}
            placeholder="Enter a prompt for image"
            placeholderTextColor="#EEEEEE"
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity
            style={styles.button}
            disabled={isPending}
            onPress={generateImage}>
            {isPending ? (
              <ActivityIndicator color="#242121" />
            ) : (
              <Text style={styles.buttonText}>Generate Image</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#242121',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  imagePreview: {
    height: 480,
    width: 'auto',
    backgroundColor: '#999999',
    borderRadius: 12,
  },
  image: {
    height: 480,
    width: 'auto',
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#242121',
    color: '#ffffff',
    height: 50,
    width: 'auto',
    fontSize: 20,
    borderColor: '#433636',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyInput: {
    opacity: 1,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  buttonText: {
    color: '#242121',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
