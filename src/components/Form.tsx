import React from 'react'
import { Tform, defaultForm } from '../interfaces'

const Form = () => {
	const [form, setForm] = React.useState<Tform>(defaultForm)
	const [counter, setCounter] = React.useState<number>(0)
	const [multiply, setMultiply] = React.useState<number>(1)
	const [customers, setCustomers] = React.useState<Tform[]>([])

	const handleFormInput = (e: React.FormEvent) => {
		const target = e.target as HTMLFormElement
		setForm({ ...form, [target.name]: target.value })
	}

	const handleButton = () => {
		setCounter(previous => previous + 1)
	}

	const handleMultiButton = () => {
		setMultiply(previous => previous * 15)
	}

	const handleFormSubmit = () => {
		fetch('http://localhost:4000', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(form),
		})
			.then(res => res.json())
			.then(data => setCustomers(data))
			.catch(err => console.log(err))
	}

	return (
		<>
			<form action='submit'>
				<label htmlFor=''>First Name</label>
				<input type='text' name='firstName' id='' onChange={handleFormInput} />
				<br />

				<label htmlFor=''>Last Name</label>
				<input type='text' name='lastName' id='' onChange={handleFormInput} />
				<br />

				<label htmlFor=''>Email</label>
				<input type='email' name='email' id='' onChange={e => handleFormInput(e)} />
				<br />

				<label htmlFor=''>Password</label>
				<input type='password' name='password' id='' onChange={e => handleFormInput(e)} />
			</form>

			{customers?.map((customer: Tform) => (
				<h3>
					{customer.firstName} {customer.lastName}
				</h3>
			))}

			<button onClick={handleFormSubmit}>Submit</button>
			<button onClick={handleButton}>{counter}</button>
			<button onClick={handleMultiButton}>{multiply}</button>
		</>
	)
}

export default Form
