
import React, { useState, useEffect, useRef } from "react";
import { faPlay, faPause, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [selected, setSelected] = useState("")
	const [canciones, setCanciones] = useState([])//en este guardo la cancion que tengamos seleccionada cuando hago click
	const [Index, setIndex] = useState([])
	const [url, setUrl] = useState("")// estado para la url que esta seleccionada
	const [search, setSearch] = useState("");

	const [stateCancion, setStateCancion] = useState("Reproducir")//para cambiar el icono de reproducir
	console.log(canciones);
	console.log(Index);


	const inputElement = useRef();//referencia elemento seleccionado

	useEffect(function () {
		console.log(url)
		inputElement.current.play()
		setStateCancion("Pausar")
	}, [url])

	// const focusInput = () => {


	// 	inputElement.current.play();

	// 	console.log(inputElement.current);

	// };
	// const focusNext = () => {
	// 	nextElement.current.play();

	// }

	const searcher = (e) => {//esta funcion es la que busca
		setSearch(e.target.value)
		console.log(e.target.value)
	}

	function obtenerCanciones() {
		fetch('https://playground.4geeks.com/apis/fake/sound/all')
			.then((response) => response.json())
			.then((data) => setCanciones(data.sound))
			.catch((error) => console.log(error))// si hay un error me muestra cual fue

	}


	useEffect(function () {
		obtenerCanciones()
	}, [])

	function SeleccionarCancion(url, index) {
		console.log(url)
		let urlsong = "https://assets.breatheco.de/apis/sound/" + url;
		setSelected(index)//???????
		setUrl(urlsong)

		//return urlsong
		// const audio = 
		// audio.play(url);

	}
	function next() {
		if (Index == 18) {
			setSelected(0)
		}
		else {
			setSelected(selected + 1)
		}
		const song = canciones[selected].url//seleccionamos la cancion con este index
		const urlsong = "https://assets.breatheco.de/apis/sound/" + song;
		setUrl(urlsong)
		inputElement.current.play()

	}
	function previus(url, index) {
		if (index === 0) {
			setSelected(18)
		}
		else {
			setSelected(selected - 1)
		}
		const song = canciones[selected].url//seleccionamos la cancion con este index
		const urlsong = "https://assets.breatheco.de/apis/sound/" + song;
		setUrl(urlsong)
		inputElement.current.play()
	}
	function ponerCancion() {
		if (stateCancion === "Reproducir") {
			setStateCancion("Pausar")
			inputElement.current.play()
		} else {
			inputElement.current.pause()
			setStateCancion("Reproducir")
		}
	}


	return (
		<div className="bg-primary " style={{ width: "600px" }}>

			<ul className="text-left text-light fs-4 text lh-lg mx-3 my-5 position-absolute top-0 start-50 p-6 translate-middle-x bg-dark" style={{ width: "600px" }}>
				{/* [<li>Morty Smith</li>,<li>Rick Sanchez</li> ] */}
				{canciones.map(function (item, index) {
					return <li role="button" key={item.id} className={`d-flex flex-row opacity-${selected === index ? `75` : `100`}`} style={{ textDecoration: "underline" }} onClick={() => SeleccionarCancion(item.url, index)}>
						<p>{index + 1}</p>
						<p className="mx-3">{item.name}</p>
					</li>
				})}
			</ul>
			<nav className="navbar bg-primary position-fixed top-0 start-50 translate-middle-x w-100 position-absolute">
				<div className="container-fluid">
					<a className="navbar-brand">Lista de Musica</a>
					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={searcher} />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</nav>
			<div className="bg-primary position-fixed bottom-0 start-50 translate-middle-x w-100 p-3">
				<audio ref={inputElement} src={url} ></audio>
				<div className="d-flex justify-content-center">
					<button className="btn btn-success m-2" onClick={previus}>Anterior</button>
					<button className="btn btn-success m-2" onClick={ponerCancion}>{stateCancion === "Reproducir" ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}</button>
					<button className="btn btn-success m-2" onClick={next}>Siguiente</button>
				</div>
			</div>
		</div>

	);
}

export default Home;