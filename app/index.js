import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from './context/theme';
import Nav from './Compontets/nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './Compontets/loading';

const Popular = React.lazy(() => import('./Compontets/popular'));
const Battle = React.lazy(() => import('./Compontets/battle'));
const Results = React.lazy(() => import('./Compontets/results'));

class App extends React.Component {
	state = {
		theme: 'light',
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}));
		}
	};
	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className="container">
							<Nav />

							<React.Suspense fallback={<Loading />}>
								<Switch>
									<Route exact path="/" component={Popular} />
									<Route exact path="/battle" component={Battle} />
									<Route path="/battle/results" component={Results} />
									<Route render={() => <h1>404</h1>} />
								</Switch>
							</React.Suspense>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
