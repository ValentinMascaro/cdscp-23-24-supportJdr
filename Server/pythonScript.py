# pythonScript.py

import sys

def helloThere():
    return "Hello there!"

def countToThree():
    return [1, 2, 3]

if __name__ == "__main__":
    # Obtient le nom de la fonction en tant qu'argument de la ligne de commande
    function_name = sys.argv[1]

    # Exécute la fonction appropriée et imprime le résultat
    if function_name == 'helloThere':
        print(helloThere())
    elif function_name == 'countToThree':
        print(countToThree())
    else:
        print(f"Fonction inconnue : {function_name}")
