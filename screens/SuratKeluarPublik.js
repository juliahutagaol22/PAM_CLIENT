import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, BackHandler } from 'react-native';
import { DataTable, Appbar, Searchbar, Card, Title, Paragraph, TouchableRipple, Provider, Dialog, Portal, Button 
        , ActivityIndicator
} from 'react-native-paper';
import suratServices from "../services/surat";
import {filter} from "smart-array-filter"
import {Text, VStack, HStack, Center, Select, Box, CheckIcon } from "native-base";

const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}


export default function SuratMasukPublik({ navigation }) {

  const [surat, setSurat] = useState();
  const [suratTemp, setSuratTemp] = useState();
  const [original, setOriginal] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSerch, setShowSerch] = useState(false);

  const [visible, setVisible] = useState(false);

  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [listTahun, setListTahun] = useState("");


  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const serchToggle = () => {
    setShowSerch(showSerch ? false : true);
  };
  const onChangeSearch = query => {
    setSearchQuery(query);
    if(query === ""){
      suratServices.getDataSuratKeluar()
      .then((response)=>{
        const newArr = response.data.map(object => {
          return {...object, tanggal_masuk: formatTanggal(object.tanggal_masuk), tanggal_surat: formatTanggal(object.tanggal_surat)};
        });
        setSurat(newArr);
      })
    }
    else {
      const hasilSerch =  filter(suratTemp, {
        keywords: query,
        caseSensitive: false,
      })
      setSurat(hasilSerch);
    } 
  };


  const filterSurat = ()=>{
    const queryFilter = bulan + " " + tahun
    const hasilSerch =  filter(suratTemp, {
        keywords: queryFilter,
        caseSensitive: false,
      })
      setSurat(hasilSerch);
      hideDialog();
  }

  useEffect(() => {
    suratServices.getDataSuratKeluar()
      .then((response)=>{
        const newArr = response.data.map(({createdAt,file_pdf,hak_akses,operator,updatedAt,...object}) => {
          return {...object, tanggal_masuk: formatTanggal(object.tanggal_masuk), tanggal_surat: formatTanggal(object.tanggal_surat)};
        });

        const temp = [...new Set(response.data.map(surat => {
                      const d = new Date(surat.tanggal_masuk);
                      return d.getFullYear()
                    }
                    )
                )
        ].sort();

        setListTahun(temp);
        setSurat(newArr);
        setSuratTemp(newArr);

      })

  }, []);

  return (
    <>
    <Provider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Appbar.Content title="Surat Keluar" />
        <Appbar.Action icon="filter" onPress={showDialog} />
        <Appbar.Action icon="magnify" onPress={serchToggle} />
      </Appbar.Header>
      {
        showSerch &&
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      }

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title ><Dialog.Icon icon="filter" /> Filter</Dialog.Title>
          <Dialog.Content>
            <Center>
              <Box maxW="300">
                <Select selectedValue={bulan} minWidth="200" accessibilityLabel="Pilih Bulan" placeholder="Pilih Bulan" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setBulan(itemValue)}>
                  <Select.Item label="Semua Bulan" value="" />
                  <Select.Item label="Januari" value="Januari" />
                  <Select.Item label="Februari" value="Februari" />
                  <Select.Item label="Maret" value="Maret" />
                  <Select.Item label="April" value="April" />
                  <Select.Item label="Mei" value="Mei" />
                  <Select.Item label="Juni" value="Juni" />
                  <Select.Item label="Juli" value="Juli" />
                  <Select.Item label="Agustus" value="Agustus" />
                  <Select.Item label="September" value="September" />
                  <Select.Item label="Oktober" value="Oktober" />
                  <Select.Item label="November" value="November" />
                  <Select.Item label="Desember" value="Desember" />
                </Select>
                <Select selectedValue={tahun} minWidth="200" accessibilityLabel="Pilih Tahun" placeholder="Pilih Tahun" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setTahun(itemValue)}>
                  <Select.Item label="Semua Tahun" value="" />
                  { listTahun &&
                    listTahun.map((tahun, index)=>{
                      return <Select.Item key={index} label={tahun} value={`${tahun}`} />   
                    })
                  }
                </Select>
              </Box>
            </Center>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={filterSurat}>Filter</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView>

        { surat ?
          surat.map((surat, index)=>
            <TouchableRipple
              key={index} onPress={()=>{navigation.navigate("DetailSuratKeluar", {id: surat.id})}}
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.card}
            >
              <Card mode="elevated">
                <Card.Content>
                  <Title>{surat.tanggal_masuk}</Title>
                  <HStack space="3">
                    <Paragraph>
                      <VStack>
                        <Text bold>Nomor Surat</Text>
                        <Text bold>Kepada</Text> 
                      </VStack>
                    </Paragraph>
                    <Paragraph>
                      <VStack>  
                        <Text>: {surat.nomor_surat}</Text>   
                        <Text>: {surat.kepada}</Text>
                      </VStack>
                    </Paragraph>
                  </HStack>
                  <Text bold>Perihal:</Text>
                  <Paragraph>{surat.perihal}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableRipple>
          )
          :
          <ActivityIndicator style={styles.loading} animating={true} />
        }
        { surat &&
          (surat.length === 0 && 
            <Center mt="40">
            <Text bold>Surat Tidak Ditemukan</Text>
            </Center>
          )
        }
      </ScrollView>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: '15px',
  },
  loading: {
    marginTop: "20px",
  }
  
});
