const CHO_DESC   = ['ㅎ','ㅍ','ㅌ','ㅋ','ㅊ','ㅈ','ㅇ','ㅅ','ㅂ','ㅁ','ㄹ','ㄷ','ㄴ','ㄱ'];
const ALPHA_DESC = [...'ZYXWVUTSRQPONMLKJIHGFEDCBA'];
const GROUPS = [
  { label: '한글', items: CHO_DESC },
  { label: 'A–Z', items: ALPHA_DESC },
  { label: '기타', items: ['#'] },
];

const $ = (s) => document.querySelector(s);
const state = { nickname: '', admin: false, letter: null, counts: {}, cards: [] };

/* ---------- 닉네임 ---------- */
function applyNickname(name) {
  state.nickname = name;
  state.admin = name.toLowerCase().includes('admin');
  localStorage.setItem('gsmon_nickname', name);
  $('#who').textContent = state.admin ? `${name} (관리자)` : name;
  $('#who').classList.toggle('admin', state.admin);
}

const dlgNick = $('#dlg-nick');
dlgNick.addEventListener('cancel', (e) => { if (!state.nickname) e.preventDefault(); });

function askNickname() {
  $('#nick-input').value = state.nickname;
  dlgNick.showModal();
}

$('#form-nick').addEventListener('submit', () => {
  const v = $('#nick-input').value.trim().slice(0, 20);
  if (!v) return;
  applyNickname(v);
  if (state.cards.length) renderCards(state.cards);
});

/* ---------- 인덱스 ---------- */
async function loadStats() {
  const r = await fetch('/api/stats');
  state.counts = (await r.json()).counts || {};
  renderIndex();
}

function renderIndex() {
  $('#index').innerHTML = GROUPS.map((g) => `
    <div class="idx-group">
      <span class="group-label">${g.label}</span>
      <div class="idx-row">
        ${g.items.map((L) => {
          const n = state.counts[L] || 0;
          return `<button class="idx ${n ? '' : 'empty'} ${state.letter === L ? 'on' : ''}"
                          data-letter="${L}"><span>${L}</span><em>${n}</em></button>`;
        }).join('')}
      </div>
    </div>`).join('');
}

$('#index').addEventListener('click', (e) => {
  const b = e.target.closest('.idx');
  if (!b) return;
  state.letter = b.dataset.letter;
  renderIndex();
  $('#board-title').textContent = `${state.letter} 인덱스`;
  $('#btn-shuffle').disabled = false;
  loadCards();
});

/* ---------- 카드 ---------- */
async function loadCards() {
  if (!state.letter) return;
  const q = new URLSearchParams({
    letter: state.letter,
    limit: $('#limit').value,
    mode: $('#mode').value,
  });
  const r = await fetch(`/api/cards?${q}`);
  renderCards((await r.json()).cards || []);
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const mine = (author) =>
  state.admin || (!!state.nickname && state.nickname.toLowerCase() === String(author).toLowerCase());

function renderCards(cards) {
  state.cards = cards;
  if (!cards.length) {
    $('#cards').innerHTML =
      `<p class="empty-msg">이 인덱스에는 아직 카드가 없어요. '글쓰기'로 첫 카드를 만들어 보세요.</p>`;
    return;
  }
  $('#cards').innerHTML = cards.map((c) => `
    <article class="card" data-id="${c.id}">
      <div class="card-inner">
        <div class="face front"><h3>${esc(c.word)}</h3></div>
        <div class="face back">
          <p class="meaning">${esc(c.meaning)}</p>
          ${c.example ? `<p class="example">${esc(c.example)}</p>` : ''}
        </div>
      </div>
      <footer>
        <span class="author">by ${esc(c.author)}</span>
        ${mine(c.author) ? `<span class="tools">
            <button class="link" data-act="edit">수정</button>
            <button class="link danger" data-act="del">삭제</button>
          </span>` : ''}
      </footer>
    </article>`).join('');
}

$('#cards').addEventListener('click', async (e) => {
  const el = e.target.closest('.card');
  if (!el) return;
  const id = el.dataset.id;
  const act = e.target.dataset.act;

  if (act === 'edit') {
    const found = state.cards.find((c) => String(c.id) === id);
    if (found) openForm(found);
  } else if (act === 'del') {
    if (!confirm('이 카드를 삭제할까요?')) return;
    const r = await fetch(`/api/cards/${id}?nickname=${encodeURIComponent(state.nickname)}`,
      { method: 'DELETE' });
    if (!r.ok) { alert((await r.json()).error); return; }
    await loadStats();
    loadCards();
  } else {
    el.classList.toggle('flipped');
  }
});

/* ---------- 작성 / 수정 ---------- */
function openForm(card) {
  $('#card-form-title').textContent = card ? '카드 수정' : '단어 카드 작성';
  $('#card-id').value = card ? card.id : '';
  $('#f-word').value = card ? card.word : '';
  $('#f-meaning').value = card ? card.meaning : '';
  $('#f-example').value = card ? (card.example || '') : '';
  $('#form-error').textContent = '';
  $('#dlg-card').showModal();
}

$('#btn-write').addEventListener('click', () => openForm(null));
$('#card-cancel').addEventListener('click', () => $('#dlg-card').close());
$('#btn-nick').addEventListener('click', askNickname);
$('#btn-shuffle').addEventListener('click', loadCards);
$('#limit').addEventListener('change', loadCards);
$('#mode').addEventListener('change', loadCards);

$('#form-card').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = $('#card-id').value;
  const payload = {
    nickname: state.nickname,
    word: $('#f-word').value,
    meaning: $('#f-meaning').value,
    example: $('#f-example').value,
  };
  const r = await fetch(id ? `/api/cards/${id}` : '/api/cards', {
    method: id ? 'PUT' : 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (!r.ok) { $('#form-error').textContent = data.error || '저장에 실패했습니다.'; return; }

  $('#dlg-card').close();
  await loadStats();
  state.letter = data.card.letter;
  $('#board-title').textContent = `${state.letter} 인덱스`;
  $('#btn-shuffle').disabled = false;
  renderIndex();
  loadCards();
});

/* ---------- 시작 ---------- */
(function init() {
  const saved = localStorage.getItem('gsmon_nickname');
  if (saved) applyNickname(saved); else askNickname();
  loadStats();
})();
