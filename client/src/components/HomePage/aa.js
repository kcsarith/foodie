const Dealerships = () => {

 useEffect(() => {
        async function getDealerships() {
            const response = await fetch('/api/home')
        }
        getDealerships()
    }, [])


  return (
    <h1>Hello</h1>
  )
}

export default Dealerships