document.addEventListener('DOMContentLoaded', (() => {
  let results = [];
  let formattedResults = [];

  (async function search() {
    try {
      const body = { name: '' };
      const response = await fetch('/admin/search', { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(body) });
      results = await response.json();
      formattedResults = results.map(i => `${i.firstName} ${i.lastName}`);
    } catch (e) {
      throw new Error(e);
    }
  }());

  const autoCompl = new window.autoComplete({
    selector: '#search-persons',
    minChars: 0,
    source: (term, resolve) => {
      resolve(formattedResults);
    },
    onSelect: (event, term) => {
      event.preventDefault();
      const [firstName, lastName] = term.split(' ');
      const person = results.find(i => i.firstName === firstName && i.lastName === lastName);
      window.location.href = `${window.location.origin}/persons/${person._id || person.id}`;
    },
  });
  autoCompl.toString(); // just for the linter

  const persCleanJobBtn = document.getElementById('persons-cleanup-job');
  persCleanJobBtn.onclick = (() => {
    window.socketEmit();
  });
}), false);
