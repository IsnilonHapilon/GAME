document.getElementById('easy-btn').addEventListener('click', function() {
      sessionStorage.setItem('difficulty', 'easy');
      window.location.href = 'battle.html';
  });
  
  document.getElementById('medium-btn').addEventListener('click', function() {
      sessionStorage.setItem('difficulty', 'medium');
      window.location.href = 'battle.html';
  });
  
  document.getElementById('hard-btn').addEventListener('click', function() {
      sessionStorage.setItem('difficulty', 'hard');
      window.location.href = 'battle.html';
  });
  