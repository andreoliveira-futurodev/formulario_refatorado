import { Endereco } from './classes.js';
import { buscarEnderecoPorCEP, salvarEnderecoLocalStorage } from './utils.js';

const form = document.getElementById('enderecoForm');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const numeroInput = document.getElementById('numero');

cepInput.addEventListener('blur', async () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) {
    alert('CEP inválido');
    return;
  }
  try {
    const data = await buscarEnderecoPorCEP(cep);
    logradouroInput.value = data.logradouro || '';
    bairroInput.value = data.bairro || '';
    cidadeInput.value = data.localidade || '';
    estadoInput.value = data.uf || '';
  } catch (error) {
    alert(error.message);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const endereco = new Endereco(
    cepInput.value,
    logradouroInput.value,
    bairroInput.value,
    cidadeInput.value,
    estadoInput.value,
    numeroInput.value
  );
  salvarEnderecoLocalStorage(endereco);
  alert('Endereço cadastrado com sucesso!');
  form.reset();
});
