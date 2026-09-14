(function () {
  var normalize = function (value) {
    return value.normalize('NFKC').toLocaleLowerCase();
  };
  var controls = document.querySelectorAll('button[data-category]');
  var cards = document.querySelectorAll('.card');
  // 照合する文字列は変わらないので、打鍵のたびに正規化し直さない。
  var haystacks = [];
  var input = document.querySelector('[data-search]');
  var count = document.querySelector('[data-result-count]');
  var empty = document.querySelector('[data-empty]');
  var selected = 'all';

  function update() {
    // 空白で区切った語は「すべて含む」で当てる。1つの文字列として照合すると
    // 「散歩 記録」のように用途を2語で探したときに当たらない。NFKC で全角空白も空白になる。
    var terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    var visible = 0;
    var soon = 0;

    cards.forEach(function (card, index) {
      var matchesCategory = selected === 'all' || card.dataset.category === selected;
      var haystack = haystacks[index];
      var matchesQuery = terms.every(function (term) { return haystack.indexOf(term) !== -1; });
      var show = matchesCategory && matchesQuery;

      card.classList.toggle('is-hidden', !show);
      if (show) {
        visible += 1;
        if (card.dataset.soon) soon += 1;
      }
    });

    var template = visible === 1 ? count.dataset.singularTemplate : count.dataset.template;
    var text = template.replace('{count}', visible);
    // 「13件」だけでは、いま入れられるアプリが何本あるのか分からない。絞り込みで内訳も動く。
    // 全部が近日公開のときは内訳ではなく状態を書く（「5件」だけだと未配信だと分からない）。
    // 全部が配信中のときは何も足さない（「8件（配信中8）」は同じことの繰り返し）。
    // テンプレートが無い HTML（キャッシュに古い index.html が残っている場合）でも
    // 絞り込み自体は動かす。ここで投げると、以降のクリックがすべて死ぬ。
    if (soon > 0 && visible - soon > 0) {
      text += (count.dataset.breakdownTemplate || '').replace('{live}', visible - soon).replace('{soon}', soon);
    } else if (soon > 0) {
      text += count.dataset.allSoonTemplate || '';
    }
    count.textContent = text;
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

  cards.forEach(function (card) { haystacks.push(normalize(card.dataset.search)); });

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
