const Modal = {
  open(){
    //abrir modal
    //adicionar classe active ao modal
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close(){
    //fechar o Modal
    //removar a classe active do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}