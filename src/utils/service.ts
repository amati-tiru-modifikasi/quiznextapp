import axios from 'axios'

export const addQuizApi = async (auth, values) => {
    try {
        const header = {
            'Content-Type' : 'application/json',
            token: auth.token
        }
        const res = await axios.post('/api/quiz', values, { headers: header })
        return res;
    } catch (error) {
        throw error
    }
}