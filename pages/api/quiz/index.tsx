import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../../src/lib/firebase-admin'
import { addQuiz as addQuizFb } from '../../../src/utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            await addQuiz(req,res)
            break;
    
        default:
            res.status(405).json({ status: false, message: 'Method not Found' })
            break;
    }
}

const addQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await auth.verifyIdToken(req.headers.token as string);
        const quizData = { ...req.body, userId: user.uid };
        await addQuizFb(quizData);
        return res
            .status(200)
            .json({ status: true, message: 'Kuis berhasil ditambahkan' });
    } catch (error) {
        return res 
            .status(500)
            .json({ status: false, message: 'Ada yang salah, gagal ditambahkan'})
    }
}