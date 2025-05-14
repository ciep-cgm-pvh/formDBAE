<template>
  <div class="p-6 h-screen">
    <h1 class="text-2xl font-bold mb-6 text-center">Gráficos</h1>
    <div class="max-w-md mx-auto mb-10">
      <canvas ref="pieChart"></canvas>
    </div>
    <div class="flex flex-col justify-center items-center mb-5">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-2 border-b text-left">Nº</th>
            <th class="py-2 px-2 border-b text-left">Nome</th>
            <th class="py-2 px-2 border-b text-left">Orgão/Entidade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sortedUsers" :key="index" class="border-b">
            <td class="py-2 px-2 text-left uppercase">{{ index + 1 }}</td>
            <td class="py-2 px-2 text-left uppercase">{{ user.name }}</td>
            <td class="py-2 px-2 text-left uppercase">{{ user.entidade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllUsers } from '../api/userService'
import Chart from 'chart.js/auto'

const users = ref([])
const pieChart = ref(null)

async function fetchDataAndCreateChart() {
  try {
    const data = await getAllUsers()
    users.value = data

    const chartData = data.map(user => ({
      nome: user.name.toUpperCase(),
      entidade: user.entidade.toUpperCase(),
    }))

    const entityCounts = {}
    chartData.forEach(item => {
      if (entityCounts[ item.entidade ]) {
        entityCounts[ item.entidade ]++
      } else {
        entityCounts[ item.entidade ] = 1
      }
    })

    const labels = Object.keys(entityCounts)
    const values = Object.values(entityCounts)

    const totalUsers = values.reduce((sum, count) => sum + count, 0)

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#C9CBCF', '#FFCD56', '#8B0000', '#008000', '#FF4500', '#2E8B57',
      '#DAA520', '#8A2BE2', '#DC143C', '#00FFFF', '#FF1493', '#ADFF2F',
      '#7B68EE', '#20B2AA', '#FF69B4',
    ]

    new Chart(pieChart.value, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Usuários por Entidade',
            data: values,
            backgroundColor: colors.slice(0, labels.length),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Distribuição de Usuários por Entidade - Total: ${totalUsers}`, 
          },
        },
      },
    })
  } catch (error) {
    console.error('Erro ao buscar dados ou criar gráfico:', error)
  }
}

const sortedUsers = computed(() => {
  return users.value.slice().sort((a, b) => {
    const entidadeA = a.entidade?.toUpperCase() || ''
    const entidadeB = b.entidade?.toUpperCase() || ''
    return entidadeA.localeCompare(entidadeB)
  })
})

onMounted(() => {
  fetchDataAndCreateChart()
})
</script>