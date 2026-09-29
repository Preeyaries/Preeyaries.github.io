(function(){
  /* ---------- mini game ---------- */
  var QS = [
    {q:'Deployed an app to AWS with GitHub Actions', a:'Com Sci Student'},
    {q:'Mixes colours on a palette on the weekend', a:'Artist'},
    {q:'Moved from Bangkok to Brisbane', a:'Traveller'},
    {q:'Tested a prototype with real users in Figma', a:'Web designer'},
    {q:'Has a playlist for every mood', a:'Hobby'},
    {q:'Trained a model with Hugging Face Transformers', a:'Com Sci Student'},
    {q:'Designed the chat screen for an AI farm assistant', a:'Web designer'}
  ];
  var gi = -1, score = 0, total = 0, answered = false;
  var gq = document.getElementById('g-q'), go2 = document.getElementById('g-opts'), gr = document.getElementById('g-res'), gs = document.getElementById('g-score');
  function nextQ(){
    gi = (gi + 1) % QS.length; answered = false; gr.textContent = '';
    gq.textContent = '"' + QS[gi].q + '"';
    go2.innerHTML = '';
    ROLES.forEach(function(r){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = r.label;
      b.addEventListener('click', function(){
        if (answered) return; answered = true; total++;
        if (r.label === QS[gi].a){score++;gr.textContent = 'Correct! That is me as a ' + r.label + '.';}
        else gr.textContent = 'Not quite. That one is my ' + QS[gi].a + ' side.';
        gs.textContent = 'Score ' + score + ' / ' + total;
      });
      go2.appendChild(b);
    });
  }
  document.getElementById('g-next').addEventListener('click', nextQ);
  nextQ();
})();
