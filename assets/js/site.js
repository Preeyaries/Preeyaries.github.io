/* Shared by every page: role list, placeholder cartoon avatars (swap for photos later). */
var ROLES = [
  {key:'student', label:'Com Sci Student', color:'#4f5263'},
  {key:'data', label:'Data scientist', color:'#4a2a6e'},
  {key:'designer', label:'Web designer', color:'#2f6f9f'},
  {key:'traveller', label:'Traveller', color:'#43843f'},
  {key:'hobby', label:'Hobby', color:'#a8456a'},
  {key:'artist', label:'Artist', color:'#8b5020'}
];
/* Real photos. Each file is a cut-out on a transparent square 1.4x the circle,
   with the circle in the middle, so the head and props can pop out of the circle. */
var PHOTOS = {
  artist: 'assets/img/artist-pop.webp',
  data: 'assets/img/data-pop.webp'
};
  function shade(hex, amt){
  var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - amt)); g = Math.round(g * (1 - amt)); b = Math.round(b * (1 - amt));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function avatar(kind, color){
  if (PHOTOS[kind]){
    var root = document.body.getAttribute('data-root') || '';
    return '<img class="photo-pop" src="' + root + PHOTOS[kind] + '" alt="" draggable="false">';
  }
  var dark = shade(color, 0.45), W = '#ffffff';
  var bg = kind === 'me' ? '#ffffff' : color;
  var hair = kind === 'me' ? '#2b2b30' : dark;
  var skin = kind === 'me' ? '#f2d6c4' : W;
  var shirt = kind === 'me' ? '#d9d7d3' : W;
  var s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  s += '<rect width="200" height="200" fill="' + bg + '"/>';
  /* long hair behind */
  s += '<path d="M64 98 C60 58 82 44 100 44 C120 44 140 58 136 98 L140 160 L60 160 Z" fill="' + hair + '"/>';
  /* body */
  s += '<path d="M34 205 C38 158 70 140 100 140 C130 140 162 158 166 205 Z" fill="' + shirt + '"/>';
  s += '<path d="M88 124 h24 v20 c-6 6 -18 6 -24 0z" fill="' + skin + '"/>';
  /* head */
  s += '<circle cx="100" cy="94" r="31" fill="' + skin + '"/>';
  /* fringe */
  s += '<path d="M68 90 C70 62 88 54 104 55 C122 56 133 68 132 90 C120 76 104 70 90 78 C82 82 75 88 68 90 Z" fill="' + hair + '"/>';
  /* face */
  s += '<circle cx="89" cy="97" r="3.2" fill="' + hair + '"/><circle cx="111" cy="97" r="3.2" fill="' + hair + '"/>';
  s += '<path d="M92 109 q8 7 16 0" stroke="' + hair + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
  if (kind === 'me') s += '<circle cx="82" cy="106" r="4" fill="#f3b3a6" opacity=".7"/><circle cx="118" cy="106" r="4" fill="#f3b3a6" opacity=".7"/>';

  if (kind === 'student'){
    s += '<g stroke="' + dark + '" stroke-width="3" fill="none"><circle cx="89" cy="97" r="9"/><circle cx="111" cy="97" r="9"/><path d="M98 97h4"/></g>';
    s += '<rect x="58" y="160" width="84" height="46" rx="5" fill="' + dark + '"/>';
    s += '<path d="M92 176 l-8 7 8 7 M108 176 l8 7 -8 7" stroke="' + W + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
  }
  if (kind === 'artist'){
    s += '<ellipse cx="96" cy="60" rx="40" ry="13" transform="rotate(-12 96 60)" fill="' + dark + '"/><circle cx="84" cy="48" r="4" fill="' + dark + '"/>';
    s += '<ellipse cx="72" cy="182" rx="30" ry="18" fill="' + dark + '"/><circle cx="62" cy="178" r="4" fill="' + W + '"/><circle cx="74" cy="173" r="4" fill="' + W + '"/><circle cx="84" cy="182" r="4" fill="' + W + '"/>';
    s += '<path d="M128 196 L150 150" stroke="' + dark + '" stroke-width="5" stroke-linecap="round"/><path d="M148 146 l6 -12 3 3 -5 12z" fill="' + dark + '"/>';
  }
  if (kind === 'traveller'){
    s += '<ellipse cx="100" cy="68" rx="58" ry="11" fill="' + dark + '"/><path d="M72 68 C72 44 128 44 128 68 Z" fill="' + dark + '"/><path d="M73 62 h54" stroke="' + W + '" stroke-width="3"/>';
    s += '<path d="M70 150 L78 205 M130 150 L122 205" stroke="' + dark + '" stroke-width="8" stroke-linecap="round"/>';
    s += '<g transform="translate(142 30)"><path d="M0 8 l24 -8 -6 8 6 8z" fill="' + W + '" opacity=".9"/></g>';
  }
  if (kind === 'designer'){
    s += '<path d="M66 98 C66 56 134 56 134 98" stroke="' + dark + '" stroke-width="6" fill="none"/><rect x="58" y="90" width="14" height="24" rx="6" fill="' + dark + '"/><rect x="128" y="90" width="14" height="24" rx="6" fill="' + dark + '"/>';
    s += '<path d="M132 160 l0 34 9 -9 7 14 6 -3 -7 -13 12 0z" fill="' + dark + '"/>';
    s += '<rect x="46" y="166" width="46" height="30" rx="4" fill="none" stroke="' + dark + '" stroke-width="3"/><path d="M52 176h22M52 184h32" stroke="' + dark + '" stroke-width="3"/>';
  }
  if (kind === 'hobby'){
    s += '<path d="M66 98 C66 56 134 56 134 98" stroke="' + dark + '" stroke-width="6" fill="none"/><circle cx="66" cy="102" r="9" fill="' + dark + '"/><circle cx="134" cy="102" r="9" fill="' + dark + '"/>';
    s += '<g fill="' + W + '" opacity=".95"><path d="M150 40 v26 a7 6 0 1 1 -4 -5 V34 l18 -5 v22 a7 6 0 1 1 -4 -5 V36z"/><path d="M34 50 v18 a6 5 0 1 1 -3 -4 V46 l12 -3 v4z"/></g>';
    s += '<rect x="92" y="164" width="16" height="26" rx="8" fill="' + dark + '"/><path d="M100 190 v12" stroke="' + dark + '" stroke-width="4"/>';
  }
  if (kind === 'data'){
    s += '<circle cx="100" cy="50" r="12" fill="' + dark + '"/>';
    s += '<rect x="50" y="158" width="100" height="48" rx="6" fill="' + dark + '"/>';
    s += '<g fill="' + W + '"><rect x="62" y="182" width="10" height="16" rx="2"/><rect x="78" y="174" width="10" height="24" rx="2"/><rect x="94" y="178" width="10" height="20" rx="2"/><rect x="110" y="168" width="10" height="30" rx="2"/></g>';
    s += '<path d="M62 176 L82 166 L98 172 L130 160" stroke="' + W + '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/><circle cx="130" cy="160" r="3.5" fill="' + W + '"/>';
    s += '<g stroke="' + W + '" stroke-width="2" opacity=".85" fill="none"><path d="M146 40 L168 30 M146 40 L162 60 M168 30 L162 60"/></g><g fill="' + W + '"><circle cx="146" cy="40" r="5"/><circle cx="168" cy="30" r="4"/><circle cx="162" cy="60" r="4"/></g>';
    s += '<g stroke="' + W + '" stroke-width="2" opacity=".85" fill="none"><path d="M30 70 L48 58 L50 80 Z"/></g><g fill="' + W + '"><circle cx="30" cy="70" r="4"/><circle cx="48" cy="58" r="3.5"/><circle cx="50" cy="80" r="3.5"/></g>';
  }
  if (kind === 'me'){
    s += '<g fill="#b9b6b0"><path d="M152 46 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z"/><path d="M44 62 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/></g>';
  }
  return '<div class="av-round">' + s + '</svg></div>';
}

document.querySelectorAll('[data-avatar]').forEach(function(el){
  var k = el.getAttribute('data-avatar');
  if (k === 'me'){ el.innerHTML = avatar('me', '#ffffff'); return; }
  var r = ROLES.filter(function(x){ return x.key === k; })[0];
  el.innerHTML = avatar(r.key, r.color);
  el.style.background = r.color;
});
