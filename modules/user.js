const connectDb = async () => {
    try {
        const pool = new Pool();
        const res = await pool.query('SELECT * FROM clients')
        console.log(res)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}






