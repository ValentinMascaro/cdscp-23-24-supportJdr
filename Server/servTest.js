// nodeScript.js

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executePythonFunction(functionName) {
  const pythonScriptPath = "C:/Users/Lucas/Documents/Fac/BIMESTRE_2/Dev_Cyber/cdscp-23-24-supportJdr/Server/pythonScript.py";
  const commandePython = `python ${pythonScriptPath} ${functionName}`;

  try {
    const { stdout, stderr } = await exec(commandePython);
    const resultatPython = stdout.trim();
    return resultatPython;
  } catch (erreur) {
    console.error(`Erreur d'exécution : ${erreur}`);
    throw erreur; // Vous pouvez lancer l'erreur à l'appelant si nécessaire
  }
}

async function main() {
  try {
    // Exécute la fonction 'helloThere' du script Python
    console.log('Exécution de la fonction helloThere() du script Python...');
    const resultatHello = await executePythonFunction('helloThere');
    console.log(resultatHello);

    // Exécute la fonction 'countToThree' du script Python
    console.log('Exécution de la fonction countToThree() du script Python...');
    const resultatCount = await executePythonFunction('countToThree');
    console.log(resultatCount);
  } catch (erreur) {
    console.error(`Erreur : ${erreur}`);
  }
}

// Appelez votre fonction asynchrone
main();
console.log("Fin du script Node.js");