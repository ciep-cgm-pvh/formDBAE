export async function createUser(userData) {
  try {
    console.log('Dados enviados ao backend:', userData)

    const response = await fetch('https://backendformdbae.onrender.com/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Erro ao criar usuário: ${errorData.error || response.statusText}`
      )
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}

export async function getAllUsers() {
  try {
    console.log('Buscando todos os usuários no backend...')
    const response = await fetch('https://backendformdbae.onrender.com/form', {
      method: 'GET', // Método HTTP GET para buscar dados
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Erro ao buscar usuários: ${errorData.error || response.statusText}`
      )
    }

    const result = await response.json()
    console.log('Dados recebidos do backend:', result)
    return result
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}