import Head from 'next/head'

// Komponen
import Navbar from '../src/common/Navbar';

const IndexPage = () => {
    return (
        <div>
            <Head>
                <title>QuizApp from Freecodecamp by Topidesta</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
            </main>
            <footer></footer>
        </div>
    )
}

export default IndexPage;
