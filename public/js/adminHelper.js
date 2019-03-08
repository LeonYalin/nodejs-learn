document.addEventListener('DOMContentLoaded', (() => {
  let results = [];
  let formattedResults = [];

  (async function search() {
    try {
      const body = { name: '' };
      const response = await fetch('/admin/search', { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(body) });
      results = await response.json();
      formattedResults = results.map(i => `${i.firstName} ${i.lastName}`);
    } catch (e) {}
  }());

  const autoCompl = new autoComplete({
    selector: '#search-persons',
    minChars: 0,
    source: (term, successCallback) => {
      successCallback(formattedResults);
    },
    onSelect: (event, term, item) => {
      event.preventDefault();
      const [firstName, lastName] = term.split(' ');
      const person = results.find(i => i.firstName === firstName && i.lastName === lastName);
      window.location.href = `${window.location.origin}/persons/${person._id}`;
    },
  });
}), false);
