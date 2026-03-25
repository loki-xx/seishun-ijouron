/* =================================================
   main.js — 青春異常論 共通スクリプト
   ================================================= */

/* ---------- Active nav link ---------- */
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---------- AYN page ---------- */
if (document.getElementById('ayn-feed')) {
  initAyn();
}

function initAyn() {
  const DUMMY = [
    { handle: 'unknown_0312',    text: 'また眠れなかった',                                   time: '02:14' },
    { handle: 'ash_2am',         text: '数字がない世界って、こんなに楽なんだ',               time: '02:11' },
    { handle: 'anonymous_7749',  text: '疲れた。ただそれだけ',                               time: '02:08' },
    { handle: 'silent_signal',   text: '誰かに届いてますか',                                 time: '01:58' },
    { handle: 'carbonated_girl', text: '感情が弾けない。サイダーが抜けたみたいに',           time: '01:47' },
    { handle: 'unknown_4421',    text: '灰になる瞬間が　いちばん綺麗だと思う',              time: '01:39' },
    { handle: 'deviation_me',    text: '平均からはみ出すことが怖い。でも平均でいることも苦しい', time: '01:28' },
    { handle: 'ayn_system',      text: 'わからなくていいと思う。わからないまま、ここにいていい', time: '01:17' },
    { handle: 'anonymous_2847',  text: '消えたいじゃなくて、休みたい',                      time: '01:02' },
    { handle: 'misfit_0107',     text: '青春って、なんで強要されるんだろう',                 time: '00:55' },
    { handle: 'ash_2am',         text: '他人の照明はいらない。自分の熱だけで照らしたい',    time: '00:44' },
    { handle: 'unknown_9981',    text: '孤独な夜に　誰かを見つけたら、もう一度だけ燃えてみよう', time: '00:31' },
    { handle: 'newcomer_3312',   text: 'ここに来てよかった',                                 time: '00:20' },
    { handle: 'wordonly',        text: '言葉だけでいい。数字はいらない',                     time: '00:09' },
    { handle: 'midnight_user',   text: '深夜2時。またここにいる',                            time: '00:01' },
  ];


  const feed    = document.getElementById('ayn-feed');
  const input   = document.getElementById('ayn-input');
  const sendBtn = document.getElementById('ayn-send');
  const charEl  = document.getElementById('ayn-char');
  const MAX     = 40;

  // Generate a stable random handle per session
  const myHandle = 'anonymous_' + Math.floor(1000 + Math.random() * 9000);

  // Render dummy posts
  DUMMY.forEach(p => renderPost(p, false, false));

  // Char counter
  input.addEventListener('input', () => {
    const len = input.value.length;
    const rem = MAX - len;
    charEl.textContent = rem + ' / ' + MAX;
    charEl.className = 'ayn-char' + (rem < 0 ? ' over' : rem <= 10 ? ' warn' : '');
    sendBtn.disabled = !input.value.trim() || rem < 0;
    autoResize(input);
  });

  // Send on button
  sendBtn.addEventListener('click', submitPost);

  // Send on Ctrl+Enter / Cmd+Enter
  input.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submitPost();
  });

  function submitPost() {
    const text = input.value.trim();
    if (!text || text.length > MAX) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    renderPost({ handle: myHandle, text, time }, true, true);
    input.value = '';
    charEl.textContent = MAX + ' / ' + MAX;
    charEl.className = 'ayn-char';
    sendBtn.disabled = true;
    autoResize(input);
    feed.scrollTop = 0;
  }

  function renderPost(post, isNew, prepend) {
    const el = document.createElement('div');
    const isAsh = post.handle === 'ash_2am';
    el.className = 'ayn-post'
      + (isNew ? ' ayn-post-new' : '')
      + (isAsh ? ' ash-post' : '');
    el.innerHTML = `
      <div class="ayn-post-header">
        <span class="ayn-handle">@${escHtml(post.handle)}</span>
        <span class="ayn-post-time">${escHtml(post.time)}</span>
      </div>
      <p class="ayn-post-text">${escHtml(post.text)}</p>
    `;
    if (prepend) {
      feed.prepend(el);
    } else {
      feed.appendChild(el);
    }
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 88) + 'px';
  }

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

/* ---------- Scroll fade-in ---------- */
(function () {
  const targets = document.querySelectorAll('[data-fade]');
  if (!targets.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => io.observe(t));
})();

/* ---------- Mobile Nav Toggle ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }
});

