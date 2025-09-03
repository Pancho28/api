import mongoose from 'mongoose';

class dbConnection {
    constructor() {
      this.connectDb();
    }

    async connectDb() {
        try {
          const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/inventory?retryWrites=true&w=majority`;
          await mongoose.connect(uri);
          console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }
    
    async closeDb() {
        try {
            await mongoose.disconnect();
            console.log("Conexión a la base de datos cerrada");
        } catch (e) {
            console.error("Error al cerrar la conexión:", e);
        }
    }

}

export default new dbConnection();
