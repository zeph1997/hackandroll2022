from cryptography.fernet import Fernet
import hashlib
import base64
import binascii
import os
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import secret

password = b"password"
salt = os.urandom(16)
kdf = PBKDF2HMAC(
    algorithm=hashes.SHA256(),
    length=32,
    salt=salt,
    iterations=390000,
)
key = base64.urlsafe_b64encode(kdf.derive(password))
f = Fernet(key)
token = f.encrypt(b"Secret message!")
token
b'...'
f.decrypt(token)
b'Secret message!'

backend = default_backend()
salt = b'\xcb\xcb\x8c\x85\xf3\x80X\xb8\xef\xaa\xe2\x16\xfd8\xd4C'

# f = Fernet(f)

# def hash_password(pw):
#     salt = base64.urlsafe_b64encode(pw.encode())
#     hashed = hashlib.sha256(salt).digest()[:32]
#     return base64.urlsafe_b64encode(hashed)

def hash_password(pw):
    return base64.urlsafe_b64encode(base64.b64encode(pw.encode()))

def get_password_check(pw):
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(),length=32,salt=salt,iterations=100000,backend=backend)
    key = base64.urlsafe_b64encode(kdf.derive(pw.encode()))
    cipher = Fernet(key)
    plain = b"testing"
    return cipher.encrypt(plain).decode("utf-8")

print(get_password_check("testing123"))

# password = hash_password("my_password")
# cipher = Fernet(password)
# plain = "hahanicetry"
# text = cipher.encrypt(plain.encode()).decode("utf-8")
# print(text)
# decMessage = cipher.decrypt(text.encode()).decode()
# print(decMessage)
