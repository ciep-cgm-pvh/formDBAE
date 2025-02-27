const API_URL = 'https://backendformdbae.onrender.com'
const API_URL_EMAIL = 'https://backendformdbaeemail.onrender.com'

export async function createUser(userData) {
  try {
    console.log('Dados enviados ao backend:', userData)

    const response = await fetch(`${API_URL}/form`, {
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
    const response = await fetch(`${API_URL}/form`, {
      method: 'GET',
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

export async function sendFormWithAttachment(formData) {
  try {
    const response = await fetch(`${API_URL_EMAIL}/send-email`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Erro ao enviar formulário: ${errorData.error || response.statusText}`
      )
    }
    const result = await response.json()
    console.log('Resposta do backend:', result)
    return result
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}
