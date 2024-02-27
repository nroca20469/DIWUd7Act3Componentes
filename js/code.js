from sjcl import SJCL;
texto_cifrado = SJCL().encrypt("Hola, soy un mensaje secreto", "Yo soy la palabra secreta")
print("Texto cifrado: ");
print(texto_cifrado);
texto_descifrado = SJCL().decrypt(texto_cifrado, "Yo soy la palabra secreta")
print("Texto descifrado: ");
print(texto_descifrado);
