/* ============================================================
   WORKS.JS — Category filter logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });

});
