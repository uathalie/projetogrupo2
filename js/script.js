//Script Bootstrap
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to//
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission//
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        swal({
          title: "Seu cadastro não foi concluído",
          text: "Preencha todos os campos",
          icon: "warning",
        });
        event.preventDefault()
        event.stopPropagation()
      }
      else{
        swal({
          title: "Seu cadastro foi concluído com sucesso!",
          text: "Aguarde nosso contato por email com mais informações",
          icon: "success",
          button: "OK",
        });
      }
      form.classList.add('was-validated')
    }
    ,false)
  })
})()


// API de Cep-------------------------------------------------------------

function limpaC() {
  //Limpa cep.
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
}

function retornoC(conteudo) {
if (!("erro" in conteudo)) {
  //Atualizar
  document.getElementById('rua').value=(conteudo.logradouro);
  document.getElementById('bairro').value=(conteudo.bairro);
  document.getElementById('cidade').value=(conteudo.localidade);
  document.getElementById('uf').value=(conteudo.uf);
} 
else {
  //CEP não Encontrado.
  limpaC();
  swal({
    title: "Cep não encontrado",
    text: "Revise o campo cep",
    icon: "warning",
  });
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

  //Expressão regular para validar o CEP.
  var validacep = /^[0-9]{8}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      //Retotno enquanto consulta
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";
      document.getElementById('uf').value="...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=retornoC';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

  } 
  else {
      //cep inválido.
      limpaC();
      swal({
        title: "Cep não encontrado",
        text: "Revise o campo cep",
        icon: "warning",
      });
  }
} 
else {
  //cep sem valor, limpa formulário.
  limpaC();
}
};
