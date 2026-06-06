import app from "./src/app.js"
const PORT = process.env.PORT || 4000

app.listen(PORT ,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})