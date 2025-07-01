document.addEventListener('DOMContentLoaded', () => {
        const getCellValue = (tr, idx) => tr.children[idx]?.innerText || '';

        const comparer = (idx, asc, type = 'text') => (a, b) => {
        const v1 = getCellValue(asc ? a : b, idx);
        const v2 = getCellValue(asc ? b : a, idx);

        if (type === 'number') return (parseInt(v1) || 0) - (parseInt(v2) || 0);

        if (type === 'date') {
            const parseDate = s => {
                if (!s) return new Date(0);
                const parts = s.trim().split(' ');
                const [d, m, y] = parts[0].split('/');
                const time = parts[1] || '00:00';
                return new Date(`${y}-${m}-${d}T${time}`);
            };
            return parseDate(v1) - parseDate(v2);
        }

        return v1.localeCompare(v2);
    };

    document.querySelectorAll('.sortable').forEach(th => {
        let asc = true;
        th.addEventListener('click', () => {
            const table = th.closest('table');
            const rows = Array.from(table.querySelectorAll('.data-row'));
            const idx = Array.from(th.parentNode.children).indexOf(th);
            const type = th.id === 'sequenceHeader' ? 'number' : th.id === 'dateHeader' ? 'date' : 'text';

            rows.forEach(r => r.classList.remove('slide-down'));
            void table.offsetWidth;

            rows.sort(comparer(idx, asc, type)).forEach(tr => {
                tr.classList.add('slide-down');
                table.appendChild(tr);
            });

            applyColorLogic(); // ← CORRIGE o problema das cores
            asc = !asc;
        });
    });

    document.getElementById('searchInput').addEventListener('input', filterRows);
    document.getElementById('stepFilter').addEventListener('change', filterRows);

    function normalize(str) {
        return str?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function filterRows() {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const step = document.getElementById('stepFilter').value;

        document.querySelectorAll('.data-row').forEach(row => {
            const rowText = row.innerText.toLowerCase();
            const stepValue = row.querySelectorAll('.data-cell')[9]?.innerText.trim();

            const matchesSearch = rowText.includes(term);
            const matchesStep = step === 'all' || normalize(stepValue) === normalize(step);

            row.style.display = (matchesSearch && matchesStep) ? '' : 'none';
        });

        animateVisibleRows();
    }


function applyColorLogic() {
    const rows = document.querySelectorAll('.data-row');
    const now  = new Date();

    rows.forEach(row => {
        const cols      = row.querySelectorAll('.data-cell');
        const prazoRaw  = cols[1]?.innerText.trim();      // dd/mm/yyyy HH:MM
        const etapaRaw  = cols[9]?.innerText || '';
        const setorRaw  = cols[6]?.innerText || '';

        const etapa = normalize(etapaRaw); // ← com acento
        const setor = normalize(setorRaw); // ← com acento

        row.classList.remove('novo','foraDoPrazo','duvida','assumido','naoTratado');

        let marcado = false;

        // Verifica se o prazo é válido e já venceu
        if (prazoRaw && prazoRaw.includes('/')) {
            const [datePart, timePart = '00:00'] = prazoRaw.split(' ');
            const [d, m, y] = datePart.split('/');
            const prazoDate = new Date(`${y}-${m}-${d}T${timePart}:00`);

            if (prazoDate instanceof Date && !isNaN(prazoDate) && now > prazoDate) {
                row.classList.add('foraDoPrazo');
                marcado = true;
            }
        }

        // Aplica outras cores (com os valores normalizados do HTML original)
        if (!marcado) {
            if (etapa === normalize('2ª Etapa - DPT Tráfego') && setor === 'dpt') {
                row.classList.add('novo');
            } else if (etapa === normalize('2ª Etapa - DPT Tráfego - Retorno da(s) Dúvida(s)') && setor === 'dpt') {
                row.classList.add('duvida');
            } else if (etapa === normalize('3ª Etapa - DPT Operadores/Revisores - Retorno da(s) Dúvida(s)') && setor === 'dpt') {
                row.classList.add('duvida');
            } else if (etapa === normalize('3ª Etapa - DPT Operadores/Revisores') && setor === 'dpt') {
                row.classList.add('naoTratado');
            } else if (setor !== 'dpt') {
                row.classList.add('assumido');
            }
        }
    });
}



    function animateVisibleRows() {
        const rows = document.querySelectorAll('.data-row');
        rows.forEach(row => row.classList.remove('slide-down'));
        void document.body.offsetWidth;
        rows.forEach(row => {
            if (row.style.display !== 'none') {
                row.classList.add('slide-down');
            }
        });
    }

    applyColorLogic();

    let activeFilter = null;

document.querySelectorAll('.filter-legend').forEach(el => {
    el.addEventListener('click', () => {
        const selected = el.getAttribute('data-filter');
        const rows = document.querySelectorAll('.data-row');

        document.querySelectorAll('.filter-legend').forEach(legend => {
            legend.classList.remove('filter-active');
        });

        if (activeFilter === selected) {
            rows.forEach(row => row.style.display = '');
            activeFilter = null;
        } else {
            rows.forEach(row => {
                row.style.display = row.classList.contains(selected) ? '' : 'none';
            });
            el.classList.add('filter-active');
            activeFilter = selected;
        }

        animateVisibleRows();
    });
});

    
    
    
});
