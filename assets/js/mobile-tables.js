/*
  Mobile table optimizer
  - Converts tables into stacked key/value lists on small screens by
    injecting column header labels into cells (data-label).
*/
(function () {
  const STACK_BREAKPOINT = 640; // px
  function enhanceTables() {
    const shouldStack = window.matchMedia(`(max-width: ${STACK_BREAKPOINT}px)`).matches;
    document.querySelectorAll('table').forEach(table => {
      if (!shouldStack) {
        // remove data-labels when returning to wide layout
        table.querySelectorAll('td[data-label]').forEach(td => td.removeAttribute('data-label'));
        return;
      }
      // Collect header labels
      const labels = [];
      const thead = table.querySelector('thead');
      if (thead) {
        thead.querySelectorAll('th').forEach(th => labels.push(th.textContent.trim()));
      } else {
        // Try first row
        const firstRow = table.querySelector('tr');
        if (firstRow) firstRow.querySelectorAll('th').forEach(th => labels.push(th.textContent.trim()));
      }
      // Apply labels to each cell
      table.querySelectorAll('tbody tr').forEach(tr => {
        tr.querySelectorAll('td').forEach((td, idx) => {
          const label = labels[idx] || '';
          if (label) td.setAttribute('data-label', label);
        });
      });
    });
  }
  window.addEventListener('DOMContentLoaded', enhanceTables);
  window.addEventListener('resize', debounce(enhanceTables, 150));
  function debounce(fn, ms) {
    let t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }
})();

