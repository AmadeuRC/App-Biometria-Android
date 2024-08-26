import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvailableAuthentication() {
    // Implementação da função de verificação de autenticação disponível
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      // Lógica para lidar com a ausência de biometria
      Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre uma digital.');
    } else {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login com Biometria',
        fallbackLabel: 'Biometria não reconhecida',
      });
      setIsAuthenticated(auth.success);
    }
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticated ? 'Sim' : 'Não'}</Text>
      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
