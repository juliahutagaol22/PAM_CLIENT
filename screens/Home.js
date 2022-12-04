import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const dashboard = () => {
    navigation.navigate('Login')
  }

  const suratMasuk = () => {
    navigation.navigate('SuratMasukPublik')
  }

  const suratKeluar = () => {
    navigation.navigate('SuratKeluarPublik')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://image.shutterstock.com/image-photo/blurred-interior-public-library-books-260nw-1896648337.jpg' }} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Sistem Arsip Surat</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={dashboard}
        >
          <Ionicons name="home" size={32} color="black" />
          <Text style={styles.text}>Dashboard Admin</Text>
          <Text>Halaman Awal</Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={suratMasuk}
        >
          <MaterialCommunityIcons name="email-receive" size={32} color="black" />
          <Text style={styles.text}>Surat Masuk</Text>
          <Text>lihat surat Masuk </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={suratKeluar}
        >
          <MaterialCommunityIcons name="email-send" size={32} color="black" />
          <Text style={styles.text}>Surat Keluar</Text>
          <Text>lihat surat Keluar </Text>

        </TouchableOpacity>
      </ImageBackground>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundImage: `url("https://pbs.twimg.com/profile_images/758612085194432512/UwFUDaB4_400x400.jpg")`,
    //backgroundRepeat: 'no-repeat',

  },
  button: {
    alignItems: "center",
    alignSelf: "auto",
    backgroundColor: "white",
    padding: 15,
    borderColor: "#555555",
    borderWidth: 1,
    borderRadius: 0,
    marginTop: 20,
    borderEndWidth: 10,
    marginHorizontal: 60,
    opacity: 0.8,
    borderRadius: 200 / 2,

  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: "bold"
  },


  image: {
    justifyContent: "center",
    width: 400,
    height: 800,
    position: "relative"
  },

});
