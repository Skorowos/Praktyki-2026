// Obsługa formularza kontaktowego
const form = document.getElementById('formularz');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('imie').value.trim();
  const email = document.getElementById('email').value.trim();
  const website = document.getElementById('www').value.trim();

  if (name !== '' && email !== '' && website !== '') {
    msg.textContent = 'formularz został poprawnie wysłany';
    form.reset(); 
  } else {
    msg.textContent = 'Proszę wypełnić wszystkie pola';
  }
});