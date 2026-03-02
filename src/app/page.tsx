export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          ⛽ Análise de Consumo Diesel
        </h1>
        <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
          Upload das planilhas para consolidação automática
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Upload Consumo */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '2px dashed rgba(255,255,255,0.3)'
          }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📊 Planilha de Consumo
            </h3>
            <input
              type="file"
              id="consumo"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
            />
            <label htmlFor="consumo" style={{
              display: 'block',
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              Clique ou arraste o arquivo
            </label>
            <p id="consumo-status" style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}></p>
          </div>

          {/* Upload Distância */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '2px dashed rgba(255,255,255,0.3)'
          }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🗺️ Planilha de Distância
            </h3>
            <input
              type="file"
              id="distancia"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
            />
            <label htmlFor="distancia" style={{
              display: 'block',
              padding: '1rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              Clique ou arraste o arquivo
            </label>
            <p id="distancia-status" style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}></p>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div id="progress-container" style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'none'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span id="progress-message">Processando...</span>
            <span id="progress-percent">0%</span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div id="progress-bar" style={{
              width: '0%',
              height: '100%',
              background: '#4ade80',
              transition: 'width 0.3s'
            }}></div>
          </div>
        </div>

        {/* Botão Processar */}
        <button
          id="btn-processar"
          disabled
          style={{
            width: '100%',
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            background: '#4ade80',
            color: '#0d1b2a',
            cursor: 'pointer',
            opacity: 0.5
          }}
        >
          Processar Dados
        </button>

        {/* Resultado */}
        <div id="resultado" style={{
          marginTop: '2rem',
          display: 'none'
        }}>
          <div style={{
            background: 'rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>✅ Processamento Concluído!</h3>
            <p id="resultado-info" style={{ marginBottom: '1rem', opacity: 0.8 }}></p>
            <button
              id="btn-download"
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                background: '#4ade80',
                color: '#0d1b2a',
                cursor: 'pointer'
              }}
            >
              📥 Baixar Planilha Consolidada
            </button>
          </div>
        </div>

        {/* Instruções */}
        <div style={{
          marginTop: '2rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '1rem' }}>📋 Formato Esperado dos Arquivos:</h4>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, opacity: 0.8 }}>
            <li><strong>Consumo:</strong> Múltiplas abas (uma por embarcação). Dados da linha 6 em diante, consumo na coluna L.</li>
            <li><strong>Distância:</strong> Uma aba com colunas: Embarcação, Data, Distância (MN).</li>
          </ul>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        const consumoInput = document.getElementById('consumo');
        const distanciaInput = document.getElementById('distancia');
        const consumoStatus = document.getElementById('consumo-status');
        const distanciaStatus = document.getElementById('distancia-status');
        const btnProcessar = document.getElementById('btn-processar');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const progressMessage = document.getElementById('progress-message');
        const progressPercent = document.getElementById('progress-percent');
        const resultado = document.getElementById('resultado');
        const resultadoInfo = document.getElementById('resultado-info');
        const btnDownload = document.getElementById('btn-download');

        let dadosConsumo = null;
        let dadosDistancia = null;
        let resultadoProcessado = null;

        function atualizarProgresso(pct, msg) {
          progressBar.style.width = pct + '%';
          progressPercent.textContent = pct + '%';
          progressMessage.textContent = msg;
        }

        function normalizarNome(nome) {
          return nome.toUpperCase().trim().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
        }

        function parseDataDDMM(valor) {
          if (!valor) return null;
          const str = String(valor).trim();
          const match = str.match(/^(\\d{1,2})[\\/\\-](\\d{1,2})$/);
          if (match) {
            const dia = parseInt(match[1]);
            const mes = parseInt(match[2]);
            const ano = mes === 12 ? 2025 : 2026;
            return new Date(ano, mes - 1, dia);
          }
          return null;
        }

        function parseDataCompleta(valor) {
          if (valor instanceof Date) return valor;
          if (typeof valor === 'number') {
            const d = XLSX.SSF.parse_date_code(valor);
            if (d) return new Date(d.y, d.m - 1, d.d);
          }
          if (typeof valor === 'string') {
            const match = valor.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
            if (match) return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
          }
          return null;
        }

        function parseNumero(valor) {
          if (typeof valor === 'number') return valor;
          if (typeof valor === 'string') {
            const n = parseFloat(valor.replace(',', '.').replace(/[^\\d.\\-]/g, ''));
            return isNaN(n) ? 0 : n;
          }
          return 0;
        }

        function dataParaChave(data) {
          return data.getFullYear() + '-' + 
            String(data.getMonth() + 1).padStart(2, '0') + '-' + 
            String(data.getDate()).padStart(2, '0');
        }

        function formatarData(data) {
          return String(data.getDate()).padStart(2, '0') + '/' + 
            String(data.getMonth() + 1).padStart(2, '0');
        }

        async function processarConsumo(arquivo) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
              const workbook = XLSX.read(e.target.result, { type: 'array' });
              const embarcacoes = [];
              
              for (const sheetName of workbook.SheetNames) {
                if (sheetName === 'CONSOLIDADO_TEMP') continue;
                const sheet = workbook.Sheets[sheetName];
                
                const nomeEmbarcacao = sheet['C3']?.v || sheetName;
                const dados = [];
                
                for (let row = 5; row < 50; row++) {
                  const dataCell = sheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
                  const consumoCell = sheet[XLSX.utils.encode_cell({ r: row, c: 11 })];
                  
                  if (!dataCell?.v || String(dataCell.v).toUpperCase() === 'TOTAL') break;
                  
                  const data = parseDataDDMM(dataCell.v);
                  const consumo = parseNumero(consumoCell?.v);
                  
                  if (data && consumo > 0) {
                    dados.push({ data, consumo });
                  }
                }
                
                if (dados.length > 0) {
                  embarcacoes.push({ nome: nomeEmbarcacao, dados });
                }
              }
              resolve(embarcacoes);
            };
            reader.readAsArrayBuffer(arquivo);
          });
        }

        async function processarDistancia(arquivo) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
              const workbook = XLSX.read(e.target.result, { type: 'array' });
              const sheet = workbook.Sheets[workbook.SheetNames[0]];
              const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
              
              const header = json[0] || [];
              let colEmbarcacao = 0, colData = 1, colDistancia = 3;
              
              for (let i = 0; i < header.length; i++) {
                const h = String(header[i] || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
                if (h.includes('embarcacao')) colEmbarcacao = i;
                if (h.includes('data')) colData = i;
                if (h.includes('distancia') || h.includes('mn')) colDistancia = i;
              }
              
              const dados = [];
              for (let i = 1; i < json.length; i++) {
                const row = json[i];
                if (!row) continue;
                
                const embarcacao = String(row[colEmbarcacao] || '').trim();
                const data = parseDataCompleta(row[colData]);
                const distancia = parseNumero(row[colDistancia]);
                
                if (embarcacao && data && distancia > 0) {
                  dados.push({ embarcacao, data, distancia });
                }
              }
              resolve(dados);
            };
            reader.readAsArrayBuffer(arquivo);
          });
        }

        consumoInput.addEventListener('change', async function(e) {
          if (e.target.files[0]) {
            consumoStatus.textContent = 'Processando...';
            dadosConsumo = await processarConsumo(e.target.files[0]);
            consumoStatus.textContent = dadosConsumo.length + ' embarcações encontradas';
            verificarPronto();
          }
        });

        distanciaInput.addEventListener('change', async function(e) {
          if (e.target.files[0]) {
            distanciaStatus.textContent = 'Processando...';
            dadosDistancia = await processarDistancia(e.target.files[0]);
            distanciaStatus.textContent = dadosDistancia.length + ' registros encontrados';
            verificarPronto();
          }
        });

        function verificarPronto() {
          if (dadosConsumo && dadosDistancia && dadosConsumo.length > 0 && dadosDistancia.length > 0) {
            btnProcessar.disabled = false;
            btnProcessar.style.opacity = 1;
          }
        }

        btnProcessar.addEventListener('click', async function() {
          progressContainer.style.display = 'block';
          resultado.style.display = 'none';
          
          atualizarProgresso(10, 'Cruzando dados...');
          
          const merged = new Map();
          const datas = new Set();
          const embarcacoes = new Set();
          
          // Processar consumo
          for (const emb of dadosConsumo) {
            const norm = normalizarNome(emb.nome);
            embarcacoes.add(emb.nome);
            
            for (const d of emb.dados) {
              const chave = dataParaChave(d.data);
              datas.add(chave);
              
              if (!merged.has(norm)) merged.set(norm, new Map());
              if (!merged.get(norm).has(chave)) merged.get(norm).set(chave, { consumo: 0, distancia: 0 });
              merged.get(norm).get(chave).consumo += d.consumo;
            }
          }
          
          atualizarProgresso(40, 'Processando distância...');
          
          // Processar distância
          for (const d of dadosDistancia) {
            const norm = normalizarNome(d.embarcacao);
            const chave = dataParaChave(d.data);
            datas.add(chave);
            
            if (!merged.has(norm)) merged.set(norm, new Map());
            if (!merged.get(norm).has(chave)) merged.get(norm).set(chave, { consumo: 0, distancia: 0 });
            merged.get(norm).get(chave).distancia += d.distancia;
          }
          
          atualizarProgresso(70, 'Gerando planilha...');
          
          // Ordenar
          const listaDatas = Array.from(datas).sort();
          const listaEmbarcacoes = Array.from(embarcacoes).sort((a, b) => a.localeCompare(b));
          
          // Criar planilha
          const headers = ['Embarcação', ...listaDatas.map(d => {
            const [y, m, day] = d.split('-');
            return day + '/' + m;
          })];
          
          // Aba Consumo
          const dadosConsumoSheet = [headers];
          for (const emb of listaEmbarcacoes) {
            const norm = normalizarNome(emb);
            const row = [emb];
            for (const dt of listaDatas) {
              const val = merged.get(norm)?.get(dt);
              row.push(val?.consumo > 0 ? val.consumo : '');
            }
            dadosConsumoSheet.push(row);
          }
          
          // Aba Distância
          const dadosDistanciaSheet = [headers];
          for (const emb of listaEmbarcacoes) {
            const norm = normalizarNome(emb);
            const row = [emb];
            for (const dt of listaDatas) {
              const val = merged.get(norm)?.get(dt);
              row.push(val?.distancia > 0 ? val.distancia : '');
            }
            dadosDistanciaSheet.push(row);
          }
          
          // Aba Consumo/MN
          const dadosConsumoMNSheet = [headers];
          for (const emb of listaEmbarcacoes) {
            const norm = normalizarNome(emb);
            const row = [emb];
            for (const dt of listaDatas) {
              const val = merged.get(norm)?.get(dt);
              if (val?.distancia > 0 && val?.consumo > 0) {
                row.push(Number((val.consumo / val.distancia).toFixed(3)));
              } else {
                row.push('');
              }
            }
            dadosConsumoMNSheet.push(row);
          }
          
          atualizarProgresso(90, 'Finalizando...');
          
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dadosConsumoSheet), 'Consumo (L)');
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dadosDistanciaSheet), 'Distância (MN)');
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(dadosConsumoMNSheet), 'Consumo por MN');
          
          resultadoProcessado = wb;
          
          atualizarProgresso(100, 'Concluído!');
          
          resultadoInfo.textContent = listaEmbarcacoes.length + ' embarcações, ' + listaDatas.length + ' dias';
          resultado.style.display = 'block';
        });

        btnDownload.addEventListener('click', function() {
          if (resultadoProcessado) {
            XLSX.writeFile(resultadoProcessado, 'Consumo_Diesel_Consolidado.xlsx');
          }
        });
      `}} />
    </main>
  );
}
