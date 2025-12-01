import { useState } from 'react'
import Layout from './components/Layout'
import AdventGrid from './components/AdventGrid'
import Snowfall from './components/Snowfall'
import ComingSoonModal from './components/ComingSoonModal'

function App() {
    return (
        <div className="app-container">
            <Snowfall />
            <ComingSoonModal />
            <Layout>
                <AdventGrid />
            </Layout>
        </div>
    )
}

export default App
