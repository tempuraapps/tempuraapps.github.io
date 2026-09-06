(function () {
  var normalize = function (value) {
    return value.normalize('NFKC').toLocaleLowerCase();
  };
  var controls = document.querySelectorAll('button[data-category]');
  var cards = document.querySelectorAll('.card');
  var input = document.querySelector('[data-search]');
  var count = document.querySelector('[data-result-count]');
  var empty = document.querySelector('[data-empty]');
  var selected = 'all';

  function update() {
    var query = normalize(input.value.trim());
    var visible = 0;

    cards.forEach(function (card) {
      var matchesCategory = selected === 'all' || card.dataset.category === selected;
      var matchesQuery = !query || normalize(card.dataset.search).includes(query);
      var show = matchesCategory && matchesQuery;

      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    var template = visible === 1 ? count.dataset.singularTemplate : count.dataset.template;
    count.textContent = template.replace('{count}', visible);
    empty.classList.toggle('is-hidden', visible !== 0);
  }

  controls.forEach(function (control) {
    control.addEventListener('click', function () {
      selected = control.dataset.category;
      controls.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === control));
      });
      update();
    });
  });

  input.addEventListener('input', update);
  document.querySelector('[data-reset]').addEventListener('click', function () {
    input.value = '';
    selected = 'all';
    controls.forEach(function (item) {
      item.setAttribute('aria-pressed', String(item.dataset.category === 'all'));
    });
    input.focus();
    update();
  });

  update();
})();
