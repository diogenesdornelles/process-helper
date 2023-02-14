import Chart from 'chart.js/auto'

export default async function () {
  const chartStatus = Chart.getChart('chart')
  if (chartStatus !== undefined) {
    chartStatus.destroy()
  }

  const contStatus = {
    minutado: 0,
    assinado: 0,
    assessor: 0,
    juiz: 0,
    conversao: 0,
    semAnalise: 0
  }
  if (document.getElementById('table_id')) {
    const allStatus = document.querySelectorAll('.select-status')
    allStatus.forEach(status => {
      if (status.value === 'minutado') {
        ++contStatus.minutado
      }
      if (status.value === 'assinado') {
        ++contStatus.assinado
      }
      if (status.value === 'conversao') {
        ++contStatus.conversao
      }
      if (status.value === 'em_exame_assessor') {
        ++contStatus.assessor
      }
      if (status.value === 'em_exame_juiz') {
        ++contStatus.juiz
      }
      if (status.value === 'sem_analise') {
        ++contStatus.semAnalise
      }
    })
    const data = {
      labels: [
        'Minutado',
        'Assinado',
        'Em análise pelo assessor',
        'Em análise pelo Juiz',
        'Conversão em diligência',
        'Sem análise'
      ],
      datasets: [{
        label: 'Situação',
        data: [contStatus.minutado, contStatus.assinado, contStatus.assessor, contStatus.juiz, contStatus.conversao, contStatus.semAnalise],
        backgroundColor: [
          'rgb(107, 33, 168)',
          'rgb(22, 163, 74)',
          'rgb(75, 85, 99)',
          'rgb(202, 138, 4)',
          'rgb(153, 27, 27)',
          'rgb(37, 99, 235)'
        ],
        hoverOffset: 4
      }]
    }

    // eslint-disable-next-line no-new
    new Chart(
      document.getElementById('chart'),
      {
        type: 'doughnut',
        data,
        options: {
          parsing: {
            // key: 'nested.value'
          },
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        }
      }
    )
  }
}
