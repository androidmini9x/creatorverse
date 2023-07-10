import { useEffect, useState } from 'react'
import './App.css'
import AddCreator from './pages/AddCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import { Link, useRoutes } from 'react-router-dom'
import EditCreator from './pages/EditCreator'
import { fetchCreators, supabase } from './client'

function App() {
	const [creators, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await fetchCreators();

			if (error) console.log('error', error)
			else setData(data)
		}
		fetchData();

	}, [supabase]);

	const saveCreator = (creator_data) => {
		const creator = creators.find(e => e.id == creator_data.id);
		if (creator) {
			setData(creators.map(e => {
				if (e.id == creator_data.id) {
					return creator_data;
				} else {
					return e;
				}
			}))
		} else {
			setData([...creators, creator_data]);
		}
	}

	const delCreator = (creator_id) => {
		const creator = creators.filter(e => e.id != creator_id);
		setData(creator);
	}

	const routes = useRoutes([
		{
			path: '/',
			element: <ShowCreators creators={creators} />
		},
		{
			path: '/:id',
			element: <ViewCreator data={creators} delCreator={delCreator} />
		},
		{
			path: '/edit/:id',
			element: <EditCreator data={creators} saveCreator={saveCreator} />
		},

		{
			path: '/new',
			element: <AddCreator saveCreator={saveCreator} />
		}
	]);



	return (
		<>
			<header className='navbar'>
				<h1 className='logo'>CREATORVERSE</h1>
				<div className='grid nav-body'>
					<Link to={`/`}>
						<button className='btn-pri'>View all creators</button>
					</Link>
					<Link to={`/new`}>
						<button className='btn-sec'>Add a creator</button>
					</Link>

				</div>
			</header>
			<main className='container-fluid'>
				{routes}
			</main>
		</>
	)
}

export default App
