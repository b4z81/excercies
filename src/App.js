import React from 'react';
import './App.scss';
import WeahterCard from './components/weatherCard/weatherCard';

class App extends React.Component {
    render() {
        return (
            <section class="content">
                <div class="cards">
                    <WeahterCard />
                </div>
            </section>
        );
    }
}

export default App;