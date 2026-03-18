from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

"""
Comprueba hash de la contraseña introducida
Uso: Login
"""


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


"""
Genera un hash para la contraseña
Uso: Registro
"""


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)
