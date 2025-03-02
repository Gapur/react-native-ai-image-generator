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
import axios from 'axios';

const API_KEY = 'sk-MY-API-KEY';

function App(): React.JSX.Element {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  async function generateImage() {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('prompt', inputText);

        const response = await axios.post(
          'https://api.stability.ai/v2beta/stable-image/generate/ultra',
          formData,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              Accept: 'image/*',
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
          },
        );

        if (response.status === 200) {
          console.log('Image generated successfully!');
          const newImageUrl = URL.createObjectURL(response.data);
          setImageUrl(newImageUrl);
        } else {
          throw new Error(`${response.status}: ${await response.data.text()}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>AI Image Generator</Text>

          {imageUrl ? (
            <Image style={styles.image} source={{ uri: imageUrl }} />
          ) : (
            <View style={styles.imagePreview} />
          )}
        </View>

        <View>
          <TextInput
            style={[styles.input, inputText ? styles.filledInput : {}]}
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
  filledInput: {
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
