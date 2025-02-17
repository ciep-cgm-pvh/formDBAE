export async function createUser(userData) {
  try {
    console.log('Dados enviados ao backend:', userData)

    const response = await fetch('http://localhost:3000/', {
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
